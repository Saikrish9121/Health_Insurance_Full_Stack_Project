import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../ReusableComponents/NavbarComponent';

const PlansPage = () => {
    const [plans, setPlans] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [planIdToUpdate, setPlanIdToUpdate] = useState('');
    const [planNameToUpdate, setPlanNameToUpdate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllPlans();
    }, []);

    const fetchAllPlans = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/plans');
            setPlans(response.data);
        } catch (error) {
            console.error('Error fetching plans:', error);
        }
    };

    const handleUpdate = (planId, planName) => {
        setPlanIdToUpdate(planId);
        setPlanNameToUpdate(planName);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setPlanIdToUpdate('');
        setPlanNameToUpdate('');
    };

    const handleSaveUpdate = async () => {
        try {
            await axios.put(`http://localhost:8081/api/plans/${planIdToUpdate}`, { planName: planNameToUpdate });
            fetchAllPlans(); // Refresh plans after update
            handleCloseModal();
        } catch (error) {
            console.error('Error updating plan:', error);
        }
    };

    const handleDelete = async (planId) => {
        try {
            await axios.delete(`http://localhost:8081/api/plans/${planId}`);
            fetchAllPlans(); // Refresh plans after delete
        } catch (error) {
            console.error('Error deleting plan:', error);
        }
    };

    const handleAddPlan = () => {
        navigate('/admin/add-new-plan'); // Redirect to add plan page
    };

    return (
        <div>
            <NavbarComponent />
            <Container>
                <h1>All Plans</h1>
                <Button variant="success" className="mb-3" onClick={handleAddPlan}>Add Plan</Button> {/* Add Plan Button */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Plan ID</th>
                            <th>Plan Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plans.map(plan => (
                            <tr key={plan.planId}>
                                <td>{plan.planId}</td>
                                <td>{plan.planName}</td>
                                <td>
                                    <Button variant="success" onClick={() => handleUpdate(plan.planId, plan.planName)}>Update</Button>
                                    {' '}
                                    <Button variant="danger" className="ml-2" onClick={() => handleDelete(plan.planId)}>Delete</Button> {/* Delete Button */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Plan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formPlanName">
                            <Form.Label>Plan Name</Form.Label>
                            <Form.Control type="text" value={planNameToUpdate} onChange={(e) => setPlanNameToUpdate(e.target.value)} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                    <Button variant="primary" onClick={handleSaveUpdate}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PlansPage;
