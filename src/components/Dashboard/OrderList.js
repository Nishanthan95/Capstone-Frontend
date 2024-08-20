import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/global.css';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
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

        const response = await axios.get('http://localhost:5000/api/orders', config);
        setOrders(response.data);

      } catch (error) {
        setError('Error fetching orders');
      }
    };

    fetchOrders();
  }, [navigate]);

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

      await axios.delete(`http://localhost:5000/api/orders/${id}`, config);
      setOrders(orders.filter(order => order._id !== id));

    } catch (error) {
      setError('Error deleting order');
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Orders</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="table-container">
        <Link to="/dashboard/orders/create">
          <button className="btn btn-primary mb-3">Create Order</button>
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Status</th>
              <th>Delivery Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order.product ? order.product.name : 'Product not found'}</td>
                <td>{order.quantity}</td>
                <td>{order.supplier}</td>
                <td>{order.orderStatus}</td>
                <td>{order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <Link to={`/dashboard/orders/edit/${order._id}`}>
                    <button className="btn btn-edit">
                      <i className="fas fa-edit"></i> Edit
                    </button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => handleDelete(order._id)}>
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

export default OrderList;
