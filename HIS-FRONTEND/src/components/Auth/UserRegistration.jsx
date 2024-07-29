import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Alert, Toast } from 'react-bootstrap';
import axios from 'axios';

function UserRegistration() {
  const [formData, setFormData] = useState({
    cname: '',
    cmail: '',
    password: '',
    phno: '',
    gender: ''
  });
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const navigate = useNavigate();
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password validation (at least 8 characters, 1 number, 1 uppercase and lowercase letter)
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    // Validate form fields
    if (!formData.cname || !formData.cmail || !formData.password || !formData.phno || !formData.gender) {
      setError('Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(formData.cmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(formData.password)) {
      setError('Password must be at least 8 characters long and include 1 number, 1 uppercase and 1 lowercase letter.');
      return;
    }

    if (!validatePhoneNumber(formData.phno)) {
      setError('Please enter a valid phone number.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8083/api/citizen/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setLoginStatus('success');
        setTimeout(() => {
          navigate('/user-login');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
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
      <Card className="registration-card">
        <Card.Body>
          <h2 className="text-center mb-4">User Registration</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cname">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" name="cname" value={formData.cname} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="cmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" name="cmail" value={formData.cmail} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter your password" name="password" value={formData.password} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="phno">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter your phone number" name="phno" value={formData.phno} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className='mt-3' block>Register</Button>
          </Form>
          <div className='text-center mt-3'>
            Already have an account? <Link to="/user-login">Login</Link>
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

export default UserRegistration;
