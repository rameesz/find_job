import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email: email,
      password: password
    };

    try {
      // Make an HTTP POST request to the server
      const response = await axios.post('http://127.0.0.1:8000/company/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the request was successful
      if (response.status === 200) {
        console.log(response);
        if(response.session_id){
          localStorage.setItem('session_id',session_id)
        }
        // Handle successful login (e.g., redirect the user)
        window.location.href = '/dashboard'; // Redirect to the dashboard page
      } else {
        // Handle errors (e.g., display error message to the user)
        console.error('Login failed:', response.data.error);
        // Display error message to the user
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('An error occurred while logging in:', error.message);
      // Display error message to the user
    }
  };

  return (
    <div style={{ border: '1px solid #ced4da', borderRadius: '5px', padding: '20px', width: "400px", margin: "200px auto" }}>
      <h2 className="mt-5">Company Login</h2>
      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <hr />
        <Link to='/register'>Create Account</Link> 
      </Form>
    </div>
  );
};

export default Login;
