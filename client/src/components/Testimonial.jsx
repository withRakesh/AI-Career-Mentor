import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const Testimonial = () => {
  return (
    <div>
      <section
        className="h-100 w-100 py-5"
        style={{ backgroundColor: "#F3F4F6", minHeight:"50vh"}}
      >
        <div>
          <div className="heading text-center mb-4">
            <h3>What Our Users Say</h3>
          </div>
          <Container>
            <Row className="g-3">
              <Col md={6} sm={12}>
                <Card className="text-center p-3 border-0 h-100 shadow-sm w-100">
                  <span className="fw-bold text-primary"> Dinesh M</span>
                  <span className="text-muted">Data Analyst</span>
                  <Card.Body>
                    <Card.Text className="text-muted">
                      <i>
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Rem voluptatum unde dolorem, non facere hic omnis
                        fugiat tempora magnam repudiandae!"
                      </i>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6} sm={12}>
                <Card className="text-center p-3 border-0 h-100  shadow-sm">
                  <span className="fw-bold text-primary"> Selvi E</span>
                  <span className="text-muted">MERN stack devoloper</span>
                  <Card.Body>
                    <Card.Text className="text-muted">
                      <i>
                        "Lorem ipsum dolor sit amet consectetur adipisicing
                        elit. Rem voluptatum unde dolorem, non facere hic omnis
                        fugiat tempora magnam repudiandae!"
                      </i>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
