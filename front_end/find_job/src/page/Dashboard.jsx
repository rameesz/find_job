import React, { useState, useEffect } from 'react';
import Openjob from './Openjob';
import Viewjob from './Viewjob';
import axios from 'axios';
import Navbar from './Navbar';
import { Container, Spinner, Alert } from 'react-bootstrap';

function Dashboard() {
  const [initialData, setInitialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    const company_id = localStorage.getItem('company_id');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/singleCompany/open_job/?company_id=${company_id}`);
      const data = response.data.map(item => ({
        id: item.id,
        title: item.title,
        company: item.company,
        description: item.description,
        location: item.location,
        education_qualification: item.education_qualification,
        requirement: item.requirement,
      }));
      setInitialData(data);
    } catch (error) {
      setError('Error fetching job data. Please try again later.');
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container className="my-4">
        {loading && (
          <div className="d-flex justify-content-center align-items-center">
            <Spinner animation="border" variant="primary" />
          </div>
        )}

        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* If there is no error and loading is finished, display the job listings */}
        {!loading && !error && (
          <>
            <Openjob fetchData={fetchData} />
            <Viewjob initialData={initialData} fetchData={fetchData} />
          </>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
