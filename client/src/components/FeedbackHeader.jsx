import React, { useContext, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Authcontext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FeedbackHeader = () => {
  const { user, dispatch } = useContext(Authcontext);
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const getUserProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/feedback", {
        headers: {
          Authorization: `Bearer ${user?.token}`, // ✅ Fixed token access
        },
      });
      setUsername(res.data.user.name);
      console.log('Username'+ userName)
    } catch (err) {
      console.error("Error fetching user profile:", err);
    }
  };

  useEffect(() => {
    if (user?.token) {
      getUserProfile();
    }
  }, [user]);

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm py-3" sticky="top">
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-4">
          <span className="text-dark">{`Welcome `}</span>
          <span
            style={{
              background: "linear-gradient(90deg, #00d9ff, #0d6efd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {userName}
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <Nav className="mx-auto text-center"></Nav>

          <div className="text-center mt-3 mt-lg-0">
            <Button variant="primary" onClick={handleLogout} className="px-4 rounded-pill">
              Logout
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default FeedbackHeader;
