import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import UserNavbar from '../ReusableComponents/UserNavBar';
import axios from 'axios';

function ViewAllPlans() {
  const [plans, setPlans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const fetchAllPlans = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/plans');
      setPlans(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleApply = (planId) => {
    navigate(`/user/validation-page/${planId}`);
    console.log(planId);
  };

  return (
    <div>
      <UserNavbar />
      <Container className="mt-3">
        <h2 className="mb-3">All Plans</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plan ID</th>
              <th>Plan Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.planId}>
                <td>{plan.planId}</td>
                <td>{plan.planName}</td>
                <td>
                  <Button variant="primary" onClick={() => handleApply(plan.planId)}>Apply</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ViewAllPlans;
