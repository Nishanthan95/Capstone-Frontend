import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import ProductList from '../components/Dashboard/ProductList';
import CreateProduct from '../components/Dashboard/CreateProduct';
import EditProduct from '../components/Dashboard/EditProduct';
import OrderList from '../components/Dashboard/OrderList';
import CreateOrder from '../components/Dashboard/CreateOrder';
import EditOrder from '../components/Dashboard/EditOrder';
import Reports from '../components/Dashboard/Reports';  
import StockList from '../components/Dashboard/StockList';
import CreateStock from '../components/Dashboard/CreateStock';
import EditStock from '../components/Dashboard/EditStock';
import VendorList from '../components/Dashboard/VendorList';
import CreateVendor from '../components/Dashboard/CreateVendor';
import EditVendor from '../components/Dashboard/EditVendor';

function DashboardPage() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="products" element={<ProductList />} />
        <Route path="products/create" element={<CreateProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />
        <Route path="stocks" element={<StockList />} />
        <Route path="stocks/create" element={<CreateStock />} />
        <Route path="stocks/edit/:id" element={<EditStock />} />
        <Route path="orders" element={<OrderList />} />
        <Route path="orders/create" element={<CreateOrder />} />
        <Route path="orders/edit/:id" element={<EditOrder />} />
        <Route path="vendors" element={<VendorList />} />
        <Route path="vendors/create" element={<CreateVendor />} />
        <Route path="vendors/edit/:id" element={<EditVendor />} />
        <Route path="reports" element={<Reports />} />
        
        {/* Redirect the base dashboard path to the reports page */}
        <Route path="/" element={<Navigate to="reports" replace />} />
      </Route>
    </Routes>
  );
}

export default DashboardPage;
