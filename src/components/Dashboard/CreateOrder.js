import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function CreateOrder() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [orderStatus, setOrderStatus] = useState('pending');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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

        const response = await axios.get('https://capstone-backend-1jax.onrender.com/api/products', config);
        setProducts(response.data);

      } catch (error) {
        setError('Error fetching products');
      }
    };

    fetchProducts();
  }, []);

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

      const orderData = { product, quantity, supplier, orderStatus, deliveryDate };
      await axios.post('https://capstone-backend-1jax.onrender.com/api/orders', orderData, config);

      navigate('/dashboard/orders');

    } catch (error) {
      setError('Error creating order');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Create Order</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product</label>
          <select
            className="form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            required
          >
            <option value="">Select a product</option>
            {products.map(p => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Quantity</label>
          <input
            className="form-control"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier</label>
          <input
            className="form-control"
            type="text"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Status</label>
          <select
            className="form-control"
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="form-group">
          <label>Delivery Date</label>
          <input
            className="form-control"
            type="date"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Order</button>
      </form>
    </div>
  );
}

export default CreateOrder;
