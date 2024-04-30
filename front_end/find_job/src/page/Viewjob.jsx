import React from 'react';
import Jobcard from './Jobcard';




const Viewjob = () => {


    
    // Example job data
    const jobs = [
      {
        title: 'Software Engineer',
        location: 'New York',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mollis nunc at felis ultricies gravida.',
      },
      {
        title: 'Data Scientist',
        location: 'San Francisco',
        description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
      },
      {
        title: 'UI/UX Designer',
        location: 'London',
        description: 'Nulla facilisi. Phasellus non semper orci. Sed nec convallis massa, eget interdum quam.',
      },
    ];
  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: '20px' }}>Job Openings</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {jobs.map((job, index) => (
            <Jobcard key={index} job={job} />
          ))}
        </div>
      </div>
    );
  };
  
  export default Viewjob;
  