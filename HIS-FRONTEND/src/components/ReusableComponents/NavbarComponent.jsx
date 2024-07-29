import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Navbar.Brand href="/admin/dashboard">Admin Dashboard</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
                <Nav className="mr-auto">
                    <Nav.Link href="/admin/dashboard">Home</Nav.Link>
                    <Nav.Link href="/admin/view-all-applications">View All Applications</Nav.Link>
                    <Nav.Link href="/admin/add-new-plan">Add Plans</Nav.Link>
                    <Nav.Link href="/admin/update-plan">Update Plan</Nav.Link>
                    <Nav.Link href="/admin/view-all-plans">View All Plans</Nav.Link>
                    <Nav.Link href="/admin-login">Log out</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarComponent;
