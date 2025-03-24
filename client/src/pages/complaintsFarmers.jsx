import React, { useState } from 'react';
import axios from 'axios';
import NavBar from '../components/navbar';
import Footer from '../components/footer';

export default function ComplaintForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.post('http://localhost:8000/api/complaints/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.detail || 'An error occurred');
    }
  };

  return (
    <><NavBar isFarmer={true} /><div className="container mt-5">
        <br />
          <h4>Submit a Complaint</h4>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit} className='w-50 m-5'>
              <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" className="form-control" name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary">Submit Complaint</button>
          </form>
      </div>
      <br /><br />
      <Footer/>
      </>
  );
}