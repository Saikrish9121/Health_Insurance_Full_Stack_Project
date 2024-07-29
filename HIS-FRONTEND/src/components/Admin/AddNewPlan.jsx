import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import NavbarComponent from '../ReusableComponents/NavbarComponent';

function AddNewPlan() {
  const [formData, setFormData] = useState({
    planName: '',
    createdDate: new Date().toISOString().slice(0, 16),
    planStatus: 'Active',
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/api/plans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('New plan added successfully');
        setShowSuccessModal(true);
      } else {
        console.error('Failed to add new plan');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false); // Close success modal handler

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} lg={6}>
            <div className="p-4 border rounded bg-light shadow">
              <h2 className="text-center mb-4">Add New Plan</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formPlanName">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Plan Name"
                    value={formData.planName}
                    onChange={(e) => setFormData({ ...formData, planName: e.target.value })}
                  />
                </Form.Group>

                <Form.Group controlId="formPlanStatus">
                  <Form.Label>Plan Status</Form.Label>
                  <Form.Control type="text" value={formData.planStatus} readOnly />
                </Form.Group>

                <Form.Group controlId="formCreatedDate">
                  <Form.Label>Created Date</Form.Label>
                  <Form.Control type="text" value={formData.createdDate} readOnly />
                </Form.Group>

                <div className="text-center mt-4">
                  <Button variant="primary" type="submit">
                    Add Plan
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your plan has been added successfully.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddNewPlan;
