import React   from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
 import { Authcontext } from '../../context/AuthContext';
import axios from 'axios';
import { useContext ,useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom'
 

const FeedbackHeader = () => {

     const { user, dispatch } = useContext(Authcontext);
      const [userName, setUsername] = useState("");
      const navigate = useNavigate()

      const handleLogout = () => {
          dispatch({
            type:"LOGOUT"
          })

          navigate('/')
      }
    
      const getUserProfile = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/feedback', {
            headers: {
              Authorization: `Bearer ${user}`, // ✅ scoped request
            },
          });
            setUsername(res.data.user.name);
        } catch (err) {
          console.error("Error fetching user profile:", err);
        }
      };
    
      useEffect(() => {
        if (user) {
          getUserProfile();
        }
      }, [user]);
 
  return (
    <div>
        <Navbar expand="lg" bg="white" className="shadow-sm py-3" sticky="top">
              <Container>
                {/* Brand / Logo */}
                <Navbar.Brand href="#home" className="fw-bold fs-4">
                  <span className="text-dark"> Welcome </span>
                  <span
                    className=""
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
      
                {/* Mobile Toggle */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
                {/* Links + Button */}
                <Navbar.Collapse
                  id="basic-navbar-nav"
                  className="justify-content-between"
                >
                  {/* Center Nav Links */}
                  <Nav className="mx-auto text-center">
                  
                  </Nav>
      
                  {/* Right Button */}
                  <div className="text-center mt-3 mt-lg-0">
                    <Button variant="primary" onClick={handleLogout} className="px-4 rounded-pill">
                       Logout
                    </Button>
                  </div>
                </Navbar.Collapse>
              </Container>
            </Navbar>
    </div>
  );
};

export default FeedbackHeader;
