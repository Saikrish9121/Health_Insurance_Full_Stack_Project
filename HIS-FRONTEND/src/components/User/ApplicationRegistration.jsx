import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Card, Toast } from 'react-bootstrap';
import UserNavbar from '../ReusableComponents/UserNavBar';

const ApplicationRegistration = () => {
  const id = localStorage.getItem("id");
  const location = useLocation();
  const { application } = location.state;
  const navigate = useNavigate();
  const { planId } = useParams();

  const [userName, setUserName] = useState(application.userName);
  const [dob, setDob] = useState(application.dob);
  const [stateName, setStateName] = useState(application.stateName);
  const [mobileNumber, setMobileNumber] = useState('');
  const [userSSN, setUserSSN] = useState(application.userSSN);
  const [userSalary, setUserSalary] = useState('');
  const [PlanId, setPlanId] = useState(planId);
  const [userId, setUserId] = useState(id);
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');


  const handleSubmit = async (e) => {

    e.preventDefault();
    // Send the data to the backend for registration
    try {
      const response = await fetch(`http://localhost:8082/api/appregistration/updateapp/${application.applicationNumber}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          dob,
          stateName,
          mobileNumber,
          userSSN,
          userSalary,
          planId,
          userId
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setLoginStatus('success'); // Show success toast
        setTimeout(() => {
          console.log(data.data);
          navigate('/user/dashboard');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
        setLoginStatus('error'); // Show error toast
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
      setLoginStatus('error'); // Show error toast
    }



  };

  return (
    <div>
      <UserNavbar />
      <Container className="mt-5">
        <h1>Application Registration Page</h1>
        <Card className="p-4 shadow">
          <Form onSubmit={handleSubmit} className="registration-form">
            <Form.Group controlId="userName">
              <Form.Label>User Name:</Form.Label>
              <Form.Control type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="stateName">
              <Form.Label>State Name:</Form.Label>
              <Form.Control type="text" value={stateName} onChange={(e) => setStateName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="mobileNumber">
              <Form.Label>Mobile Number:</Form.Label>
              <Form.Control type="text" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="userSSN">
              <Form.Label>User SSN:</Form.Label>
              <Form.Control type="text" value={userSSN} onChange={(e) => setUserSSN(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="userSalary">
              <Form.Label>User Salary:</Form.Label>
              <Form.Control type="text" value={userSalary} onChange={(e) => setUserSalary(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="PlanId">
              <Form.Label>Plan ID:</Form.Label>
              <Form.Control type="text" value={PlanId} onChange={(e) => setPlanId(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="userId">
              <Form.Label>User ID:</Form.Label>
              <Form.Control type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" className='mt-3'>Submit</Button>
          </Form>
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
          <Toast.Body>Application Registration is completed, and your Application number is {application.applicationNumber}</Toast.Body>
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
    </div>
  );
};

export default ApplicationRegistration;
