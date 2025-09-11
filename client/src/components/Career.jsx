import React from 'react'
import { Container, Button } from 'react-bootstrap'

export const Career = () => {
  return (
    <div>
    <section
      className="d-flex align-items-center text-center bg-primary"
      style={{ minHeight: "40vh" }} // full screen height
    >
      <Container>
        {/* Heading */}
        <div
          className="heading"
         style={{ fontSize: "clamp(2rem, 6vw, 10rem)", fontWeight: "bold" }}
        >
            <h1 className='text-white'>Ready to Transform Your Career?</h1>
 
        </div>

        {/* Subtext */}
        <p className="fs-6 mx-auto " style={{ maxWidth: "700px" , color:'#ffffff70'}}>
         Join thousands of professionals already charting their path with AI guidance
        </p>

        {/* Call-to-Action */}
        <div className="mt-4">
          <Button variant=" fs-6" size="lg" className="px-4 py-2 rounded-pill" style={{backgroundColor:'white', color:'#108ef5ff'}}>
            Start Your Journey
          </Button>
        </div>
      </Container>
    </section>
    </div>
  )
}
