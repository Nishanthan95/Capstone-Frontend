import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
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

        const response = await axios.get('http://localhost:5000/api/products', config);
        setProducts(response.data);

      } catch (error) {
        const errorMsg = error.response ? error.response.data.msg : error.message;
        setError(`Error fetching products: ${errorMsg}`);
      }
    };

    fetchProducts();
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

      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      setProducts(products.filter(product => product._id !== id));

    } catch (error) {
      const errorMsg = error.response ? error.response.data.msg : error.message;
      setError(`Error deleting product: ${errorMsg}`);
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Products</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="table-container">
        <Link to="/dashboard/products/create">
          <button className="btn btn-primary mb-3">Create Product</button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>${product.price}</td>
                <td>
                  <Link to={`/dashboard/products/edit/${product._id}`}>
                    <button className="btn btn-edit">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => handleDelete(product._id)}>
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

export default ProductList;
