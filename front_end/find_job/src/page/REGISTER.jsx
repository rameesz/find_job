import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';

function REGISTER() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/', {
        email: email,
        password: password,
      });

      console.log('Response:', response);

      if (response.status === 201) {
        setMessage('Registration successful!');
        navigate('/login');
      } else {
        setMessage('Registration failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card shadow-sm" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Company Register</h2>

          {message && (
            <div className="alert alert-info" role="alert">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>

            <div className="mt-3 text-center">
              <hr />
              <Link to="/login">Already have an account? Login</Link>
              <br />
              <Link to="/customer/login">User Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default REGISTER;
