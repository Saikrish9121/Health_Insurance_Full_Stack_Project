import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useHistory for navigation
import { Container, Form, Button, Card, Alert } from 'react-bootstrap'; // Import Bootstrap components


function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Initialize useHistory hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8083/api/citizen/recover', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: email,
      });

      if (response.ok) {
        alert('Password reset link has been sent to your email.');
        navigate('/user-login'); // Navigate to login page after successful submission
      } else {
        alert('Failed to send password reset link. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card className="forget-password-card">
        <Card.Body>
          <h2 className="text-center mb-4">Forget Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" block className='mt-3'>Submit</Button><br /><br />
            <Button variant="warning" onClick={() => navigate('/user-login')} block>Back to Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ForgetPassword;
