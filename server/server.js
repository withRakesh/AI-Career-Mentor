const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/userRoutes");
const multer = require('multer')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
 
 

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads')
  },
  filename: function(req, file, cb){
    cb(null, file.originalname.replace(/\.[^/.]+$/, "") + "_" + Date.now() + path.extname(file.originalname));
  }
})

const maxSize = 5*1000*1000;

 const upload = multer({
  storage: storage,
  limits:  {fileSize: maxSize},
  fileFilter: function(req, file, cb){
    let fileTypes = /pdf|docx/;
    let mimeType = fileTypes.test(file.mimetype)
    let extName = fileTypes.test(path.extname(file.originalname));

    if(mimeType && extName){
      return cb(null, true)
    }

    cb('Error: file upoad only supporst the following filetypes :'+ fileTypes);
  }
}).single('mypdf')


app.post('/feedback', (req, res, next) => {
  upload(req, res, function(err){
    if(err){
      res.json(err)
    }else{
      res.json('success.  Resume uploaded')
    }
  })
 
})

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
