import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

function AppliedCustomer() {
  const { jobId } = useParams();
  const [customers, setCustomers] = useState([]);

  

  useEffect(() => {
    fetchCustomers();
  }, [jobId]);

  const fetchCustomers = () => {
    axios.get(`http://127.0.0.1:8000/company/appliedcustomer/${jobId}/`)
      .then(response => {
        console.log(response);
        setCustomers(response.data);
      })
      .catch(error => console.error('Error fetching customers:', error));
  };

  return (
    <Container style={{ marginTop: '60px' }}>
      <h2 className="text-center mb-4">Applicants for Job ID: {jobId}</h2>
      {customers.length > 0 ? (
        customers.map(customer => (
          <div className="card mb-3" key={customer.email}>
            <div className="card-body">
              <h5 className="card-title">Name: {customer.name}</h5>
              <p className="card-text">Email: {customer.email}</p>
              <p className="card-text">Phone: {customer.phone}</p>
              <p className="card-text">Qualification: {customer.qualification}</p>
              <p className="card-text">CV: <a href={`${customer.resume_url}`} className="card-link">Click here to view CV</a></p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No applicants found for this job.</p>
      )}
    </Container>
  );
}

export default AppliedCustomer;
  