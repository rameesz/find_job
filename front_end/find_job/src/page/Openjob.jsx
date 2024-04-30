import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Openjob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the form data to the server
    const formData = {
      title: title,
      description: description,
      location: location
    };
    console.log('Form data:', formData);
    // You can use Axios or fetch to send formData to your backend
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Create Job Opening</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter job title" value={title} onChange={handleTitleChange} />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter job description" value={description} onChange={handleDescriptionChange} />
        </Form.Group>

        <Form.Group controlId="formRecuirement">
          <Form.Label>Recuirement</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter job Qualification" value={description} onChange={handleDescriptionChange} />
        </Form.Group>       

        <Form.Group controlId="formEducationQualification">
          <Form.Label>Education Qualification</Form.Label>
          <Form.Control type="text" placeholder="Enter Education Qualification" value={location} onChange={handleLocationChange} />
        </Form.Group>

        <Form.Group controlId="formLocation">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" placeholder="Enter job location" value={location} onChange={handleLocationChange} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: '100%', marginTop: '20px' }}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Openjob;
