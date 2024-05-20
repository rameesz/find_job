import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Navigationbar() {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/dashboard">Home</Nav.Link>
              <Nav.Link href="/applyjob">APPLY JOB</Nav.Link>
              <Nav.Link href="#link2">Link 2</Nav.Link>
              <Nav.Link href="#link3">Link 3</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
}

export default Navigationbar