import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const MyProfile = () => {
  const [showModal, setShowModal] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    fname: '',
    lname: '',
    qualification: '',
    resume: '',
    resume_url: '',
    experience: 0,
    phone: '',
  });
  const navigate = useNavigate(); // Add useNavigate hook
  const id = localStorage.getItem('customer_id');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/customer/profile/${id}`);
      const data = response.data;
      setInitialData(data);
      setFormData({
        email: data.email,
        fname: data.fname,
        lname: data.lname,
        qualification: data.qualification,
        resume: '',
        experience: data.experience,
        phone: data.phone,
      });
    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleSaveChanges = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('email', formData.email);
      formDataToSend.append('fname', formData.fname);
      formDataToSend.append('lname', formData.lname);
      formDataToSend.append('qualification', formData.qualification);
      if (formData.resume) {
        formDataToSend.append('resume', formData.resume);
      }
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('phone', formData.phone);

      const response = await axios.patch(`http://127.0.0.1:8000/customer/register/?id=${initialData.id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Changes saved:', response.data);
      setShowModal(false);
      fetchData(); // Re-fetch the data to update UI

      // Optionally, navigate to another page after saving changes
      // navigate('/some-path');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Card className="mx-auto my-5 p-4 shadow-sm" style={{ maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title className="mb-4">My Profile</Card.Title>
          <Card.Text><strong>Email:</strong> {initialData.email}</Card.Text>
          <Card.Text><strong>First Name:</strong> {initialData.fname}</Card.Text>
          <Card.Text><strong>Last Name:</strong> {initialData.lname}</Card.Text>
          <Card.Text><strong>Phone:</strong> {initialData.phone}</Card.Text>
          <Card.Text><strong>Qualification:</strong> {initialData.qualification}</Card.Text>
          <Card.Text><strong>Experience:</strong> {initialData.experience}</Card.Text>
          <Card.Title>CV: <a href={`${initialData.resume_url}`}>CLICK HERE</a></Card.Title>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleEditClick}>
              Update Profile
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" name="fname" value={formData.fname || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" name="lname" value={formData.lname || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={formData.phone || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formQualification" className="mb-3">
              <Form.Label>Qualification</Form.Label>
              <Form.Control type="text" name="qualification" value={formData.qualification || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formExperience" className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Control type="number" name="experience" value={formData.experience || ''} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group controlId="formCv" className="mb-3">
              <Form.Label>Upload CV</Form.Label>
              <Form.Control type="file" name="resume" onChange={handleFileChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MyProfile;
