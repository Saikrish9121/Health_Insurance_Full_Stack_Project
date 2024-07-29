import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Toast } from 'react-bootstrap'; // Import Bootstrap components
import axios from 'axios';

function AdminRegistration() {
  const [formData, setFormData] = useState({
    adminEmail: '',
    adminPassword: ''
  });
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.adminEmail || !formData.adminPassword) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8084/api/admin/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        setLoginStatus('success');
        setTimeout(() => {
          navigate('/admin-login');
        }, 2000);
      } else {
        alert('Registration failed. Please try again.');
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
      setLoginStatus('error');
    }
  };


  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="admin-registration-card">
        <Card.Body>
          <h2 className="text-center mb-4">Admin Registration</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="adminEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="adminEmail" value={formData.adminEmail} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="adminPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name="adminPassword" value={formData.adminPassword} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" type="submit" block className='mt-3'>Register</Button>
          </Form>
          <div className='text-center mt-3'>
            Already have an account? <Link to="/admin-login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <Toast
        show={loginStatus === 'success'}
        onClose={() => setLoginStatus('')}
        delay={3000}
        autohide
        className="position-fixed top-0 end-0"
        style={{ zIndex: 9999, minWidth: '250px' }}
      >
        <Toast.Header closeButton={false} className="bg-success text-light">
          <strong className="me-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Registration successful!</Toast.Body>
      </Toast>
      <Toast
        show={loginStatus === 'error'}
        onClose={() => setLoginStatus('')}
        delay={3000}
        autohide
        className="position-fixed top-0 end-0"
        style={{ zIndex: 9999, minWidth: '250px' }}
      >
        <Toast.Header closeButton={false} className="bg-danger text-light">
          <strong className="me-auto">Error</strong>
        </Toast.Header>
        <Toast.Body>Some Error Occured. Please try again.</Toast.Body>
      </Toast>
    </Container>
  );
}

export default AdminRegistration;
