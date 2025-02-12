import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const UpdateProfile = () => {
  const [fname, setFristName] = useState('');
  const [lname, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('fname', fname);
      formData.append('lname', lname);
      formData.append('phone', phone);
      formData.append('qualification', qualification);
      formData.append('experience', experience);
      formData.append('resume', resume);

      const response = await axios.post('http://127.0.0.1:8000/customer/update_profile/', formData);
      
      console.log('Response:', response);
      if (response.status === 200) {
        alert('Application submitted successfully!');
      } else {
        alert('Error submitting application. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <Container className="my-5" style={{maxWidth: '600px'}}>
      <div className="shadow p-4 rounded">
        <h3 className="text-center mb-4">Update Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formFirstName">
            <Form.Label column sm={4}>First Name</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={fname}
                onChange={(e) => setFristName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formLastName">
            <Form.Label column sm={4}>Last Name</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPhone">
            <Form.Label column sm={4}>Phone</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formQualification">
            <Form.Label column sm={4}>Qualification</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="text"
                placeholder="Enter your qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formExperience">
            <Form.Label column sm={4}>Experience</Form.Label>
            <Col sm={8}>
              <Form.Control
                type="number"
                placeholder="Enter years of experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formCv">
            <Form.Label column sm={4}>Upload CV</Form.Label>
            <Col sm={8}>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
                className="form-control"
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" size="lg" block className="mt-4">
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default UpdateProfile;
