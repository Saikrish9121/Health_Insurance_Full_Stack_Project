import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import NavbarComponent from '../ReusableComponents/NavbarComponent';
import axios from 'axios';

function UpdatePlan() {
    const [showModal, setShowModal] = useState(false);
    const [planId, setPlanId] = useState('');
    const [formData, setFormData] = useState({
        planName: '',
        planStatus: '',
    });

    useEffect(() => {
        const fetchPlanDetails = async () => {
            try {

                const response = await axios.get(`http://localhost:8081/api/plans/${planId}`);

                if (response.status === 200) {
                    const planData = response.data;
                    setFormData({
                        planName: planData.planName,
                        planStatus: planData.planStatus,
                    });
                } else {
                    console.error('Failed to fetch plan details');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPlanDetails();
    }, [planId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8081/api/plans/${planId}`, formData);

            if (response.status === 200) {
                console.log('Plan updated successfully');
                setShowModal(true);
            } else {
                console.error('Failed to update plan');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <div>
            <NavbarComponent />
            <Container>
                <Row className="justify-content-center mt-4">
                    <Col xs={12} md={8} lg={6}>
                        <div className="p-4 border rounded bg-light shadow">
                            <h2 className="text-center mb-4">Update Plan</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formPlanId">
                                    <Form.Label>Plan ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Plan ID"
                                        value={planId}
                                        onChange={(e) => setPlanId(e.target.value)}
                                    />
                                </Form.Group>

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
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Plan Status"
                                        value={formData.planStatus}
                                        onChange={(e) => setFormData({ ...formData, planStatus: e.target.value })}
                                    />
                                </Form.Group>

                                <div className="text-center mt-4">
                                    <Button variant="primary" type="submit">
                                        Update Plan
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Success!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your plan has been updated successfully.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UpdatePlan;
