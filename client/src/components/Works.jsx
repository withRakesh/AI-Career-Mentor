import React from "react";
import { Container, Row, Col, Card,  } from "react-bootstrap";

const Works = () => {
  return (
    <div>
      <section className="w-100 h-100 p-2 pb-5" style={{backgroundColor:'#F9FAFC'}}>
        <div className="text-center pt-4 pb-3">
          <h3>How It Works</h3>
          <p>
            Our AI platform uses a simple, three step process to guide you
            toward your ideal career.
          </p>
        </div>
        <Container className="py-2">
          <Row className="g-3">
            <Col  md={4} sm={12}>
              <Card className="text-center bg-white border-0 p-3 shadow-sm h-100"     >
                <div className="icon mb-3">
                  <i
                    className="fas fa-sticky-note"
                    style={{
                      backgroundColor: "#a8dbf3ff",
                      color: "blue",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  ></i>
                </div>
                <Card.Title>Access Your Profile</Card.Title>
                <Card.Body>
                  <Card.Text className="text-muted mx-auto"   >
                    Our AI analyzes your skills, experience, and aspiations to
                    craete a comprehensive profile
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col  md={4} sm={12}>
              <Card className="text-center bg-white border-0 p-3 shadow-sm h-100" >
                <div className="icon mb-3">
                  <i
                    className="fas fa-route"
                    style={{
                      backgroundColor: "#a8dbf3ff",
                      color: "blue",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  ></i>
                </div>
                <Card.Title>Discover Pathways</Card.Title>
                <Card.Body>
                  <Card.Text className="text-muted" style={{maxHeight:'400px'}}>
                    Receive personalized career roadmaps, identifying roles and skills that align with your goals
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col  md={4} sm={12}>
              <Card className="text-center bg-white border-0 p-3 shadow-sm h-100" >
                <div className="icon mb-3">
                  <i
                    className="fas fa-rocket"
                    style={{
                      backgroundColor: "#a8dbf3ff",
                      color: "blue",
                      padding: "15px",
                      borderRadius: "50%",
                    }}
                  ></i>
                </div>
                <Card.Title>Take Action</Card.Title>
                <Card.Body>
                  <Card.Text className="text-muted">
                    Access tailored learning resources and job listing to make your next move with confidence.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Works;
