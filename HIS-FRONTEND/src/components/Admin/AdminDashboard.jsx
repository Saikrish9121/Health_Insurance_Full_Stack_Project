import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap'; // Import Bootstrap components
import NavbarComponent from '../ReusableComponents/NavbarComponent';
import axios from 'axios';
import { UserCard } from '../ReusableComponents/UserCard';

function AdminDashboard() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    // Fetch admin data
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/admin/admindash');
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    }
  };

  return (
    <div >
      <NavbarComponent />
      <Container>
        <Row>
          <UserCard title="Total Users" bgColor="bg-info" data={userData.noOfUsers} />
          <UserCard title="Total Pending Applications" bgColor="bg-warning" data={userData.noOfPendingRequests} />
          <UserCard title="Total Active Plans" bgColor="bg-success" data={userData.noOfActivePlans} />
          <UserCard title="Total Plans Approved" bgColor="bg-primary" data={userData.noOfPlansApproved} />
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
