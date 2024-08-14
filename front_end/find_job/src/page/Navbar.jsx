import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';  // Import custom CSS file

function NavigationBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const isLoggedIn = localStorage.getItem('customer_id'); // Check if user is logged in
  const isCompanyLoggedIn = localStorage.getItem('company_id'); // Check if user is logged in

  const customerLogin = () => {
    navigate('/customer/login');
  };

  const companyLogin = () => {
    navigate('/login');
  };

  const data = {
    sessionKey: localStorage.getItem('session_id')
  };

  const companyData = {
    sessionKey: localStorage.getItem('session_cmp_id')
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/customer/logout/', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('session_id');
        localStorage.removeItem('customer_id');
        navigate('/customer/login');
      } else {
        console.error('Logout failed:', response.data.error);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred while logging out:', error.message);
      alert('An error occurred while logging out. Please try again.');
    }
  };

  const handleCompanyLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/company/logout/', companyData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('session_cmp_id');
        localStorage.removeItem('company_id');
        console.log('Logout successful');
        navigate('/login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = () => {
    navigate(`/?search=${searchQuery}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary custom-navbar">
      <Container fluid>
        <Navbar.Brand href='/' className="custom-navbar-brand">
          Find Your Dream Jobs Here
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {isCompanyLoggedIn && <Nav.Link href='/dashboard' className="custom-nav-link">Company Dashboard</Nav.Link>}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 custom-search"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success" className="me-2 custom-button" onClick={handleSearch}>Search</Button>
            {isLoggedIn ? (
              <Button variant="outline-danger" className="me-2 custom-button" onClick={handleLogout}>Candidate Logout</Button>
            ) : (
              isCompanyLoggedIn ? (
                <Button variant="outline-success" className="me-2 custom-button" onClick={handleCompanyLogout}>Company Logout</Button>
              ) : (
                <>
                  <Button variant="outline-danger" className="me-2 custom-button" onClick={companyLogin}>Company Login</Button>
                  <Button variant="outline-danger" className="me-2 custom-button" onClick={customerLogin}>Candidate Login</Button>
                </>
              )
            )}
            {isLoggedIn && <Button variant="outline-primary" className="custom-button" onClick={() => navigate('/profile')}>Profile</Button>}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
