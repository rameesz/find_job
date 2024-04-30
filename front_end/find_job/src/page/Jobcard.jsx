import React from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Jobcard = ({ job }) => {
  return (
    <Card style={{ width: '58rem', marginBottom: '20px' }}>
    <Card.Body>
      <Card.Title>{job.title}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted">{job.location}</Card.Subtitle>
      <Card.Text>{job.description}</Card.Text>
      <div className="d-flex justify-content-end">
        <Button variant="primary" className="mr-2">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </Card.Body>
  </Card>
  );
};

export default Jobcard