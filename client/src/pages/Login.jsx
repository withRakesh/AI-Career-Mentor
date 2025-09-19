import React, { useState } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleEvent = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user.email || !user.password) return alert("please fill all feilds");

      const res = await axios.post("http://localhost:5000/api/login", user);
      localStorage.setItem("token", res.data.token);


      alert(res.data.message || "login successfully");

      navigate("/feedback");

      setUser({ email: "", password: "" });
    } catch (err) {
      alert( err.response?.data?.message || "Erorr while login", err);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(90deg, #1bc8e762, #0d6dfdaf)" }}
    >
      <Container
        className="p-4 rounded bg-white shadow"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="text-center mb-4 text-primary">Login</h3>
        <Form onSubmit={handleSubmit}>
          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleEvent}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter password"
              onChange={handleEvent}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          <Link to="/register" className="text-decoration-none text-dark">
            Don’t have an account?{" "}
            <span className="text-primary">Register</span>
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default Login;
