import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const UserNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/user/dashboard">User Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/user/dashboard">Home</Nav.Link>
                    <Nav.Link href="/user/view-all-plans">View All Plans</Nav.Link>
                    <Nav.Link href="/user/validation-page">Application Registration</Nav.Link>
                    <Nav.Link href="/user-login">Logout</Nav.Link>
                </Nav>


            </Navbar.Collapse>
        </Navbar>
    );
};

export default UserNavbar;
