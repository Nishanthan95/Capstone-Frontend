import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Sidebar() {
  return (
    <Nav defaultActiveKey="/dashboard" className="flex-column bg-light p-3">
      <LinkContainer to="/dashboard/products">
        <Nav.Link>Products</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/dashboard/stocks">
        <Nav.Link>Stock</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/dashboard/orders">
        <Nav.Link>Orders</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/dashboard/vendors">
        <Nav.Link>Vendors</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/dashboard/reports">
        <Nav.Link>Reports</Nav.Link>
      </LinkContainer>
    </Nav>
  );
}

export default Sidebar;
