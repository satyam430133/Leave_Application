import Form from './form';

import React, { useState, useEffect } from 'react';

function App() {
  const [leaveApplications, setLeaveApplications] = useState([]);

  useEffect(() => {
    fetchLeaveApplications();
  }, []);

  const fetchLeaveApplications = async () => {
    try {
      const response = await fetch('http://localhost:3001/leave-applications');
      const data = await response.json();
      setLeaveApplications(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Form />
      <ul>
        {leaveApplications.map(application => (
          <li key={application.id}>
            <strong>Name:</strong> {application.employee_name}, 
            <strong> Start Date:</strong> {application.start_date},
            <strong> End Date:</strong> {application.end_date},
            <strong> Reason:</strong> {application.reason},
            <strong> Status:</strong> {application.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

