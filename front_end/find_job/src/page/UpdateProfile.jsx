import React, { useState } from 'react';
import { Button, TextField, Typography, Grid, Container, makeStyles } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
  },
}));

const UpdateProfile = () => {
  const classes = useStyles();

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
     
      // You can add additional logic after successful submission
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.root} style={{marginTop:"50px"}}>
        <Typography component="h1" variant="h5" style={{textAlign:'center'}}>
          UPDATE PROFILE
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    label="First Name"
                    value={fname}
                    onChange={(e) => setFristName(e.target.value)} // Corrected typo here
                />
            </Grid>

            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Last Name"
                value={lname}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Qualification"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <label htmlFor="upload-cv">Upload CV</label>
              <input
                id="upload-cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setResume(e.target.files[0])}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{marginTop:'20px'}}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default UpdateProfile;