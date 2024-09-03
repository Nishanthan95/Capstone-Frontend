import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function EditOrder() {
  const { id } = useParams(); 
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplier, setSupplier] = useState('');
  const [orderStatus, setOrderStatus] = useState('pending');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
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

        const orderResponse = await axios.get(`https://capstone-backend-1jax.onrender.com/api/orders/${id}`, config);
        const order = orderResponse.data;

        setProduct(order.product || '');
        setQuantity(order.quantity);
        setSupplier(order.supplier || '');
        setOrderStatus(order.orderStatus);
        setDeliveryDate(order.deliveryDate ? order.deliveryDate.split('T')[0] : '');

        const productResponse = await axios.get('https://capstone-backend-1jax.onrender.com/api/products', config);
        setProducts(productResponse.data);

      } catch (error) {
        setError('Error fetching order or products');
      }
    };

    fetchOrder();
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

      const orderData = { product, quantity, supplier, orderStatus, deliveryDate };
      await axios.put(`https://capstone-backend-1jax.onrender.com/api/orders/${id}`, orderData, config);

      navigate('/dashboard/orders');

    } catch (error) {
      setError('Error updating order');
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Edit Order</h2>
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
            type="number"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Supplier</label>
          <input
            type="text"
            className="form-control"
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
            type="date"
            className="form-control"
            value={deliveryDate}
            onChange={(e) => setDeliveryDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Update Order</button>
      </form>
    </div>
  );
}

export default EditOrder;
