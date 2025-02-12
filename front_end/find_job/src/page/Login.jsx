import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error
  const navigate = useNavigate();

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
      const response = await axios.post('http://127.0.0.1:8000/company/login/', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if the request was successful
      if (response.status === 200) {
        if (response.data.session_id) {
          localStorage.setItem('session_cmp_id', response.data.session_id);
          localStorage.setItem('company_id', response.data.company_id);
          setMessage('Login successful!');
          setMessageType('success');
          navigate('/dashboard'); // Redirect to the dashboard after success
        }
      } else {
        setMessage('Login failed. Please check your credentials.');
        setMessageType('danger');
      }
    } catch (error) {
      console.error('An error occurred while logging in:', error.message);
      setMessage('An error occurred. Please try again.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Company Login</h2>

          {message && (
            <Alert variant={messageType} className="mb-3">
              {message}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Submit
            </Button>

            <div className="text-center">
              <hr />
              <Link to="/register" className="d-block mb-2">Create Account</Link>
              <Link to="/customer/login" className="d-block">User Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
