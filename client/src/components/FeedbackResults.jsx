import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
 

/* 🧩 Add this helper function BEFORE your App component */
function extractSection(text, sectionName) {
  if (!text) return "Not available."; // safety check
  const regex = new RegExp(`${sectionName}[:\\-\\s]*([\\s\\S]*?)(?=\\n\\s*\\w+:|$)`, "i");
  const match = text.match(regex);
  return match ? match[1].trim() : "Not available.";
}


import ReactMarkdown from "react-markdown";

const FeedbackResults = ({ data, loading, error }) => (
  <Card className="mb-4">
    <Card.Body>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : data ? (
        <div
          style={{
            maxHeight: "60vh",
            overflowY: "auto",
            background: "#f8f9fa",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <ReactMarkdown>{data}</ReactMarkdown>
        </div>
      ) : (
        <p>No response yet.</p>
      )}
    </Card.Body>
  </Card>
);

/* 🚀 Main App Component */
const App = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("userInput").value.trim();

    if (!input) {
      setError("Please enter a message");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze and give clean format like every heading have 5 points only and highlight the sub headings following user input and provide:
          1. Strengths
          2. Weaknesses
          3. Career Readiness

          User input:
          ${input}`,
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.choices && data.choices[0]?.message?.content) {
        setResult(data.choices[0].message.content);
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container fluid className="py-4 vh-100">
      <Row className="justify-content-center g-4">
        <Col md={4} xs={12}>
          <h5 className="mb-3">Input Your Career Data</h5>
          <Form onSubmit={handleSubmit}>
            <textarea
              id="userInput"
              className="w-100 mb-3 form-control"
              rows="5"
              placeholder="Type your message..."
            ></textarea>
            <Button type="submit" className="bg-primary border-0 px-4">
              Submit
            </Button>
          </Form>
        </Col>

        <Col md={6} xs={12}>
          <h5 className="mb-3 text-primary">Your AI Feedback Results</h5>
          <FeedbackResults data={result} loading={loading} error={error} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
