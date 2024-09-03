import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function StockList() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(''); 

  useEffect(() => {
    const fetchStocks = async () => {
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

        const response = await axios.get('https://capstone-backend-1jax.onrender.com/api/stocks', config);
        setStocks(response.data);

      } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        setError(`Error fetching stocks: ${errorMsg}`);
      }
    };

    fetchStocks();
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

      await axios.delete(`https://capstone-backend-1jax.onrender.com/api/stocks/${id}`, config);
      setStocks(stocks.filter(stock => stock._id !== id));

    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      setError(`Error deleting stock: ${errorMsg}`);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Stock</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="table-container">
        <Link to="/dashboard/stocks/create">
          <button className="btn btn-primary mb-3">Create Stock</button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map(stock => (
              <tr key={stock._id}>
                <td>{stock.name}</td>
                <td>{stock.description}</td>
                <td>{stock.quantity}</td>
                <td>
                  <Link to={`/dashboard/stocks/edit/${stock._id}`}>
                    <button className="btn btn-edit">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => handleDelete(stock._id)}>
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StockList;
