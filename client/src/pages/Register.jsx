import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // if user not enter details
      if (!user.name || !user.email || !user.password) {
        alert("please fill all fields");
        return;
      }
     
      // API request
      const res = await axios.post("http://localhost:5000/api/register", user);

      // success message
      alert(res.data.message || "user register successfully");


      navigate('/login')
      
      // After successfull clear the feilds
      setUser({ name: "", email: "", password: "" });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "something went wrong");
    }
  };

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(90deg,  #1bc8e762, #0d6dfdaf)" }}
    >
      <Container
        className="p-4 rounded bg-white shadow"
        style={{ maxWidth: "500px" }}
      >
        <h3 className="text-center mb-4 text-primary">Register</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label className="fw-bold" style={{ color: "#36454F" }}>
              Name
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleEvent}
              required
            />
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="fw-bold" style={{ color: "#36454F" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              onChange={handleEvent}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className="fw-bold" style={{ color: "#36454F" }}>
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleEvent}
              required
            />
          </Form.Group>
          {/* Submit Button */}
          <Button
            variant="primary"
            type="submit"
            className="w-100 mb-3 rounded-pill py-2"
          >
            Register
          </Button>
          <Link
            className="text-center text-decoration-none text-secondary"
            to="/login"
          >
            <p>
              Already have an account ?{" "}
              <span className="text-primary">Login</span>
            </p>
          </Link>
        </Form>
      </Container>
    </div>
  );
};

export default Register;
