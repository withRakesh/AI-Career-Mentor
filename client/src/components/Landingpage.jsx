import React from "react";
import { Button, Container } from "react-bootstrap";

const Landingpage = () => {
  return (
    <section
      className="d-flex align-items-center text-center"
      style={{ minHeight: "60vh" }} // full screen height
    >
      <Container>
        {/* Heading */}
        <div
          className="heading"
         style={{ fontSize: "clamp(2rem, 6vw, 10rem)", fontWeight: "bold" }}
        >
          <h1>
            <span>Your </span>
            <span
              style={{
                background: "linear-gradient(90deg, #00c9ecff, #0d6efd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Personal AI Career Mentor
            </span>
          </h1>
 
        </div>

        {/* Subtext */}
        <p className="fs-6 mx-auto" style={{ maxWidth: "700px" }}>
          Leverage cutting-edge AI to navigate your professional path. Get
          personalized advice, discover new opportunities, and unlock your full
          potential.
        </p>

        {/* Call-to-Action */}
        <div className="mt-4">
          <Button variant="primary fs-6" size="lg" className="px-4 py-2 rounded-pill">
            Start Your Journey
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Landingpage;
