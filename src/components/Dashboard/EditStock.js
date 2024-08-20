import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function EditStock() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStock = async () => {
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

        const response = await axios.get(`http://localhost:5000/api/stocks/${id}`, config);
        console.log('Fetched stock:', response.data);

        const stock = response.data;
        setName(stock.name);
        setDescription(stock.description);
        setQuantity(stock.quantity);

      } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        setError(`Error fetching stock: ${errorMsg}`);
      }
    };

    fetchStock();
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

      const stockData = { name, description, quantity };
      await axios.put(`http://localhost:5000/api/stocks/${id}`, stockData, config);

      console.log('Stock updated successfully.');
      navigate('/dashboard/stocks');

    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      setError(`Error updating stock: ${errorMsg}`);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Stock</h2>
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
          <label>Description</label>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Stock</button>
      </form>
    </div>
  );
}

export default EditStock;
