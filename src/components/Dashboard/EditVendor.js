import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function EditVendor() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        let token = localStorage.getItem('token');

        if (!token) {
          setError('No token found. Please log in.');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`http://localhost:5000/api/vendors/${id}`, config);
        const vendor = response.data;

        setName(vendor.name);
        setContactNumber(vendor.contactNumber);
        setEmail(vendor.email);
        setAddress(vendor.address);

      } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        setError(`Error fetching vendor: ${errorMsg}`);
      }
    };

    fetchVendor();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let token = localStorage.getItem('token');

      if (!token) {
        setError('No token found. Please log in.');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const vendorData = { name, contactNumber, email, address };
      await axios.put(`http://localhost:5000/api/vendors/${id}`, vendorData, config);

      console.log('Vendor updated successfully.');
      navigate('/dashboard/vendors');

    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      setError(`Error updating vendor: ${errorMsg}`);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Vendor</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
        <button type="submit" className="btn btn-primary">Update Vendor</button>
      </form>
    </div>
  );
}

export default EditVendor;
