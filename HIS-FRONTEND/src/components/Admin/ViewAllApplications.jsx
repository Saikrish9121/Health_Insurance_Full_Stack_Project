import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import NavbarComponent from '../ReusableComponents/NavbarComponent';
import axios from 'axios';

function ViewAllApplications() {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [plan, setPlan] = useState('');
  const [amount, setAmount] = useState('');



  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://localhost:8084/api/admin/report', {
        responseType: 'blob',
      });

      const file = new Blob([response.data], {
        type: 'application/pdf',
      });
      // Create a link element, use it to download the file and remove it
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', 'report.csv'); // Set the file name for download
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(fileURL); // Clean up the URL object
      link.remove(); // Remove the link from the DOM
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };
  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:8082/api/appregistration/pending');
      if (response.status === 200) {
        setApplications(response.data);
      } else {
        console.error('Failed to fetch applications');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleApprove = async (applicationId, planId) => {

    const selectedApp = applications.find(app => app.applicationNumber === applicationId);
    try {
      const planResponse = await axios.get(`http://localhost:8081/api/plans/${planId}`);
      setPlan(planResponse.data.planName);
      setSelectedApplication(selectedApp);
      setShowModal(true);

    } catch (error) {
      console.error('Error:', error);
    }

  };


  const handleDeny = async (applicationId) => {
    try {
      await axios.put(`http://localhost:8084/api/admin/changeplanstatus/${applicationId}`, { approvalStatus: 'Denied' });
      await axios.put(`http://localhost:8082/api/appregistration/updatestatus/${applicationId}`);
      const updatedApplications = applications.filter(app => app.applicationNumber !== applicationId);
      setApplications(updatedApplications);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = async () => {
    if (selectedApplication) {
      const today = new Date();
      const expiryDate = new Date();
      expiryDate.setFullYear(today.getFullYear() + 1);

      const approveForm = {
        planName: plan,
        benefitAmount: amount,
        approvedDate: today,
        expiryDate: expiryDate,
        userId: selectedApplication.userId,
        approvalStatus: 'Approved'
      }
      try {
        await axios.put(`http://localhost:8084/api/admin/changeplanstatus/${selectedApplication.applicationNumber}`, approveForm);
        await axios.put(`http://localhost:8082/api/appregistration/updatestatus/${selectedApplication.applicationNumber}`);
        const updatedApplications = applications.filter(app => app.applicationNumber !== selectedApplication.applicationNumber);
        setApplications(updatedApplications);
        handleModalClose();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div>
      <NavbarComponent />

      <div className="container">
        <h2 className="mt-3">All Applications</h2>
        <button className="btn btn-primary" onClick={handleDownload}>
          Download Reports
        </button>
        <Table striped bordered hover variant="light" className="mt-3">
          <thead>
            <tr>
              <th>Application Number</th>
              <th>User Name</th>
              <th>Date of Birth</th>
              <th>State Name</th>
              <th>Mobile Number</th>
              <th>SSN</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.applicationNumber}>
                <td>{app.applicationNumber}</td>
                <td>{app.userName}</td>
                <td>{app.dob}</td>
                <td>{app.stateName}</td>
                <td>{app.mobileNumber}</td>
                <td>{app.userSSN}</td>
                <td>{app.appStatus}</td>
                <td>
                  <Button variant="success" onClick={() => handleApprove(app.applicationNumber, app.planId)}>
                    Approve
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleDeny(app.applicationNumber)}>
                    Deny
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal for approval */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approve Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formPlanName">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control type="text" placeholder="Enter plan name" value={plan} onChange={(e) => setPlanName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formBenefitAmount">
              <Form.Label>Benefit Amount</Form.Label>
              <Form.Control type="number" placeholder="Enter benefit amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleModalSubmit}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewAllApplications;