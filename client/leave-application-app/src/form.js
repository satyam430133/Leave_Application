import React, { useState } from 'react';
import './App.css'
const Form = () => {
  const [formData, setFormData] = useState({
    employee_name: '',
    start_date: '',
    end_date: '',
    reason: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/leave-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div style={{height:"50px"}}> </div>
   <div id='outline'>
   <div className='leaveapplication'>
   <h5 className="card-title text-center mb-4">Leave Application Form</h5>
      <div className="form-group">
        <label htmlFor="employeeName">Employee Name</label> <br/>
        <input type="text" id="employeeName" name="employee_name" value={formData.employee_name} onChange={handleChange} className="form-control" />
      </div> 
      <div className="form-group">
        <label htmlFor="startDate">Start Date</label> <br/>
        <input type="date" id="startDate" name="start_date" value={formData.start_date} onChange={handleChange} className="form-control" />
      </div> 
      <div className="form-group">
        <label htmlFor="endDate">End Date</label> <br/>
        <input type="date" id="endDate" name="end_date" value={formData.end_date} onChange={handleChange} className="form-control" />
      </div> 
      <div className="form-group">
        <label htmlFor="reason">Reason</label> <br/>
        <textarea id="reason" name="reason" value={formData.reason} onChange={handleChange} className="form-control" rows="4"></textarea>
      </div> <br/> <br/>
      <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block mt-4">Submit</button>
   </div>
   </div>
  </>
  );
};

export default Form;
