import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Card, Toast } from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons'; // Import EyeFill and EyeSlashFill icons
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8084/api/admin/login', null, {
        params: {
          "username": username,
          "password": password
        }
      });

      if (response.data) {
        setLoginStatus('success');
        localStorage.setItem('isAdminLoggedIn', 'true');
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 2000);
      } else {
        // Handle invalid credentials
        setLoginStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
      setLoginStatus('error');
    }
  };

  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Card className="admin-login-card">
          <Card.Body>
            <h2 className="text-center mb-4">Admin Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </Form.Group>
              <Button variant="primary" className="mt-3" type="submit">Login</Button>
            </Form>
            <div className="text-center mt-3">
              Didn't have an account? <Link to="/admin-registration">Register</Link>
            </div>
            <div className="text-center mt-3">
              <Link to="/user-login">User Login</Link>
            </div>
          </Card.Body>
        </Card>
      </Container>
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
        <Toast.Body>Login successful!</Toast.Body>
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
        <Toast.Body>Invalid credentials. Please try again.</Toast.Body>
      </Toast>
    </div>
  );
}

export default AdminLogin;





