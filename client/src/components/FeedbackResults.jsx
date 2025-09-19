import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, ListGroup, ProgressBar, Badge } from 'react-bootstrap';
import axios from 'axios';
import Header from './Header';

const FeedbackResults = ({ data }) => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Strengths & Weaknesses</Card.Title>
      <ul>
        <li><b>Strengths:</b> {data?.strengths || "N/A"}</li>
        <li><b>Weakness:</b> {data?.weaknesses || "N/A"}</li>
      </ul>
    </Card.Body>
  </Card>
);

const JobRoles = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Suggested Job Roles</Card.Title>
      <ListGroup>
        <ListGroup.Item>
          <span role="img" aria-label="data scientist">🟧</span> Data Scientist <Badge bg="success">✔</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <span role="img" aria-label="business analyst">🟩</span> Business Analyst <Badge bg="warning">⚠</Badge>
        </ListGroup.Item>
        <ListGroup.Item>
          <span role="img" aria-label="product manager">🟦</span> Product Manager <Badge bg="danger">✖</Badge>
        </ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
);

const SkillsToLearn = () => (
  <Card>
    <Card.Body>
      <Card.Title>Recommended Skills to Learn</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item>Machine Learning <ProgressBar now={100} label="Complete" className="my-2" /></ListGroup.Item>
        <ListGroup.Item>SQL <ProgressBar now={70} label="Good" className="my-2" /></ListGroup.Item>
        <ListGroup.Item>AWS <ProgressBar now={30} label="Basic" className="my-2" variant="warning" /></ListGroup.Item>
        <ListGroup.Item>Strategic Planning <ProgressBar now={100} label="Complete" className="my-2" /></ListGroup.Item>
      </ListGroup>
    </Card.Body>
  </Card>
);

const UploadResume = () => (
  <Card className="mb-4">
    <Card.Body>
      <Card.Title>Upload Your Resume</Card.Title>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Control type="file" />
      </Form.Group>
      <Button variant="dark">Browse Files</Button>
      <hr />
      <Form.Label>Or Enter Skills Manually</Form.Label>
      <Form.Control type="text" placeholder="e.g. Python, Project Management, Data Analysis" />
    </Card.Body>
  </Card>
);

const App = () => {
 

  return (
    <Container fluid className="py-4">
      <Row className="justify-content-center">
        <Col md={4} xs={12}>
          <h5 className="mb-3">Input Your Career Data</h5>
          <UploadResume />
        </Col>
        <Col md={6} xs={12}>
          <h5 className="mb-3">Your AI Feedback Results</h5>
          <FeedbackResults  />
          <JobRoles />
          <SkillsToLearn />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
