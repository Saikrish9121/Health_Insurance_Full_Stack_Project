import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserNavbar from '../ReusableComponents/UserNavBar';
import { UserCard } from '../ReusableComponents/UserCard';
import axios from 'axios';

function Dashboard() {
  const [userData, setUserData] = useState({});
  const userId = localStorage.getItem("id");

  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:8083/api/citizen/dashboard/${userId}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <UserNavbar />
      <Container className="mt-4">
        <h2 className="mb-4">User Dashboard</h2>
        <Row>
          <UserCard title="Total Users" bgColor="bg-success" data={userData.noOfUsers} />
          <UserCard title="Total Active Plans" bgColor="bg-primary" data={userData.noOfPlans} />
          <UserCard title="Total Approved Plans" bgColor="bg-secondary" data={userData.noOfApproved} />
          <UserCard title="Total Denied Plans" bgColor="bg-info" data={userData.noOfDenied} />
        </Row>
      </Container>
    </div>
  );
}

export default Dashboard;
