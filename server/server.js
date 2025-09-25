const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth"); // For DOCX parsing
const OpenAI = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_APIKEY});

 
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) =>
    cb(
      null,
      file.originalname.replace(/\.[^/.]+$/, "") +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    ),
});

const maxSize = 5 * 1000 * 1000;

const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|docx/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));

    if (mimeType && extName) return cb(null, true);

    cb(
      "Error: file upload only supports the following filetypes: " + fileTypes
    );
  },
}).single("mypdf");

// Resume upload & parsing
app.post("/feedback", (req, res) => {
  upload(req, res, async (err) => {
    if (err) return res.status(400).json({ error: err });
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;
    let text = "";

    try {
      const ext = path.extname(filePath).toLowerCase();

      if (ext === ".pdf") {
        const buffer = fs.readFileSync(filePath);
        const data = await pdfParse(buffer);
        text = data.text;
      } else if (ext === ".docx") {
        const data = await mammoth.extractRawText({ path: filePath });
        text = data.value;
      } else {
        return res.status(400).json({ error: "Unsupported file type" });
      }

      // --- Call OpenAI to get career analysis ---
      const careerReport = await getCareerAnalysis(text);

      res.json({
        message: "Resume analyzed successfully",
        resumeText: text,
        feedback: careerReport
      });
    } catch (parseErr) {
      res.status(500).json({
        error: "Failed to parse resume or generate AI feedback",
        details: parseErr.message
      });
    }
  });
});


// domains
const domains = {
  "Software Development": ["software engineer", "developer", "full stack", "backend", "frontend", "programmer", "javascript", "python", "java"],
  "Data Science": ["data scientist", "machine learning", "data analysis", "deep learning", "AI", "python", "R", "pandas", "numpy"],
  "Marketing": ["marketing", "SEO", "content strategist", "brand manager", "social media"],
  "Finance": ["financial analyst", "accounting", "investment", "finance", "CPA"],
  "Project Management": ["project manager", "PMP", "scrum master", "agile", "project coordination"]
};

function extractDomain(resumeText) {
  const text = resumeText.toLowerCase();
  for (const [domain, keywords] of Object.entries(domains)) {
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return domain;
      }
    }
  }
  return "Unknown";
}


 

async function getCareerAnalysis(resumeText) {
  const domain = extractDomain(resumeText);

  const prompt = `
You are a career mentor AI. Analyze the following resume and provide a detailed career report.
Resume Domain: ${domain}
Resume Text: ${resumeText}

Requirements:
- Identify 3 core professional strengths
- Identify 2-3 areas for improvement
- Suggest 5 recommended skills to learn
- Suggest potential career progression paths

Output JSON keys: domain, current_skills, strengths, weaknesses, recommended_skills, career_scope
`;

  const aiResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });

  let feedbackJSON;
  try {
    feedbackJSON = JSON.parse(aiResponse.choices[0].message.content);
  } catch (err) {
    feedbackJSON = { error: "Failed to parse AI response", raw: aiResponse.choices[0].message.content };
  }

  return feedbackJSON;
}




// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
