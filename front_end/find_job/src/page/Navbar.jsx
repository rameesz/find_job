import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import axios from "axios";
import "../App.css"; // Import custom CSS file

function NavigationBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const isLoggedIn = !!localStorage.getItem("customer_id"); // Check if customer is logged in
  const isCompanyLoggedIn = !!localStorage.getItem("company_id"); // Check if company is logged in

  const handleLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/customer/logout/", {
        sessionKey: localStorage.getItem("session_id"),
      });

      localStorage.removeItem("session_id");
      localStorage.removeItem("customer_id");
      navigate("/customer/login");
    } catch (error) {
      console.error("Logout Error:", error.message);
      alert("Error logging out. Please try again.");
    }
  };

  const handleCompanyLogout = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/company/logout/", {
        sessionKey: localStorage.getItem("session_cmp_id"),
      });

      localStorage.removeItem("session_cmp_id");
      localStorage.removeItem("company_id");
      navigate("/login");
    } catch (error) {
      console.error("Company Logout Error:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/?search=${searchQuery}`);
    }
  };

  return (
    <Navbar expand="lg" className="navbar-dark py-3 shadow-lg" style={{ background: "linear-gradient(to right, #4e73df, #1cc88a)" }}>
      <Container>
        {/* Show brand only when neither customer nor company is logged in */}
        {isLoggedIn && !isCompanyLoggedIn && (
          <Navbar.Brand as={Link} to="/" className="fw-bold text-white fs-2">
            Find Your Dream Jobs
          </Navbar.Brand>
        )}

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            {isCompanyLoggedIn && !isLoggedIn && ( // Show only if a company is logged in
              <Nav.Item>
                <Link to="/dashboard" className="nav-link text-white fw-semibold fs-5">
                  Company Dashboard
                </Link>
              </Nav.Item>
            )}
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex flex-wrap gap-2 align-items-center">
            <Form.Control
              type="search"
              placeholder="Search jobs..."
              className="me-2 border-light rounded-pill px-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ backgroundColor: "#f8f9fc", color: "#495057" }}
            />
            <Button
              variant="outline-light"
              onClick={handleSearch}
              className="rounded-pill px-4"
              style={{ transition: "background-color 0.3s ease" }}
            >
              Search
            </Button>

            {/* Conditional Login/Logout Buttons */}
            {isLoggedIn ? (
              <>
                <Button
                  variant="outline-warning"
                  onClick={() => navigate("/profile")}
                  className="rounded-pill px-4"
                >
                  Profile
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleLogout}
                  className="rounded-pill px-4 ms-2"
                >
                  Logout
                </Button>
              </>
            ) : isCompanyLoggedIn ? (
              <Button
                variant="outline-danger"
                onClick={handleCompanyLogout}
                className="rounded-pill px-4 ms-2"
              >
                Company Logout
              </Button>
            ) : (
              <>
                <Button
                  variant="outline-light"
                  onClick={() => navigate("/login")}
                  className="rounded-pill px-4 ms-2"
                >
                  Company Login
                </Button>
                <Button
                  variant="outline-warning"
                  onClick={() => navigate("/customer/login")}
                  className="rounded-pill px-4 ms-2"
                >
                  Candidate Login
                </Button>
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
