import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AppNavbar from '../Layout/Navbar';
import Sidebar from '../Layout/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <>
      <AppNavbar />
      <Container fluid>
        <Row>
          <Col md={2}>
            <Sidebar />
          </Col>
          <Col md={10}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
