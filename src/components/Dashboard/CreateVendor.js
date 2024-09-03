import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function CreateVendor() {
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, please log in.');
        navigate('/login');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const vendorData = { name, contactNumber, email, address };
      await axios.post('https://capstone-backend-1jax.onrender.com/api/vendors', vendorData, config);

      console.log('Vendor created successfully.');
      navigate('/dashboard/vendors');

    } catch (error) {
      console.error('Error creating vendor:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Vendor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            className="form-control"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Vendor</button>
      </form>
    </div>
  );
}

export default CreateVendor;
