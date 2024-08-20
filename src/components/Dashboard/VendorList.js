import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function VendorList() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
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

        const response = await axios.get('http://localhost:5000/api/vendors', config);
        setVendors(response.data);

      } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        setError(`Error fetching vendors: ${errorMsg}`);
      }
    };

    fetchVendors();
  }, []);

  const handleDelete = async (id) => {
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

      await axios.delete(`http://localhost:5000/api/vendors/${id}`, config);
      setVendors(vendors.filter(vendor => vendor._id !== id));

    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      setError(`Error deleting vendor: ${errorMsg}`);
    }
  };

  return (
    <div className='table-container'>
      <h1 className='page-title'>Vendors</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <Link to="/dashboard/vendors/create">
        <button className="btn btn-primary mb-3">Create Vendor</button>
      </Link>
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(vendor => (
            <tr key={vendor._id}>
              <td>{vendor.name}</td>
              <td>{vendor.contactNumber}</td>
              <td>{vendor.email}</td>
              <td>{vendor.address}</td>
              <td>
                <Link to={`/dashboard/vendors/edit/${vendor._id}`}>
                  <button className="btn btn-edit">
                    <i className="fas fa-edit"></i> Edit
                  </button>
                </Link>
                <button className="btn btn-delete" onClick={() => handleDelete(vendor._id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorList;
