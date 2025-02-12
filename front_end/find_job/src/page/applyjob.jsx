import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Alert } from "@mui/material";
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const Applyjob = () => {
  const [Data, setData] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const handleApply = async (jobId, company) => {
    const customerId = localStorage.getItem('customer_id');
    if (!customerId) {
      navigate('/customer/login');
      return;
    }

    try {
      const rdata = { job_id: jobId, company_id: company, customer_id: customerId };
      const response = await axios.post('http://127.0.0.1:8000/company/jobapplication/', rdata);

      if (response.status === 201) {
        setIsAlert(true);
        setTimeout(() => setIsAlert(false), 3000);
      } else if (response.status === 200) {
        alert(response.data.error);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/company/openjob/')
      .then(response => {
        const data = response.data.map(item => ({
          id: item.id,
          company: item.company,
          title: item.title,
          description: item.description,
          location: item.location,
          education_qualification: item.education_qualification,
          requirement: item.requirement
        }));
        setData(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const filteredData = Data.filter(job => job.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <Navbar />
      <Container className="mt-4 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        {isAlert && (
          <Alert severity="success" className="mb-3 text-center">
            ✅ You have successfully applied for this job.
          </Alert>
        )}

        <Grid container spacing={3} justifyContent="center">
          {filteredData.map((job) => (
            <Grid item xs={12} sm={10} md={8} key={job.id}>
              <Card sx={{ boxShadow: 5, borderRadius: 8 }} className="p-3 bg-light">
                <CardContent>
                  <Typography variant="h5" className="fw-bold text-primary">
                    {job.title}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom className="text-muted">
                    🏢 <strong>Company:</strong> {job.company}
                  </Typography>
                  <Typography color="textSecondary" className="text-muted">
                    📍 <strong>Location:</strong> {job.location}
                  </Typography>
                  <Typography variant="body1" className="mt-3 mb-2">
                    <strong>Description:</strong> {job.description}
                  </Typography>
                  <Typography variant="body1" className="mt-2 mb-3">
                    <strong>Requirements:</strong> {job.requirement}
                  </Typography>

                  {/* Apply Button */}
                  <Button
                    variant="primary"
                    className="w-100 rounded-pill py-2 text-white"
                    onClick={() => handleApply(job.id, job.company)}
                    style={{
                      backgroundColor: "#007bff",
                      border: "none",
                      fontWeight: "bold",
                      transition: "0.3s ease",
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}
                  >
                    Apply Now
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Applyjob;
