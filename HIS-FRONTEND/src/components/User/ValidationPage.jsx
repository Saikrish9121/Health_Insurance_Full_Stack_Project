import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker styles
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import UserNavbar from '../ReusableComponents/UserNavBar';
import { useNavigate, useParams } from 'react-router-dom';


const ValidationPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        ssn: '',
    });
    const navigate = useNavigate();
    const { planId } = useParams();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8082/api/appregistration/eligibility', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            if (data.stateName === 'Rhode Island') {
                navigate(`/user/application-registration/${planId}`, { state: { application: data } });
            } else {
                alert('You are not eligible for the plan.');
            }
        } catch (error) {
            console.error('Fetch Error: ', error);
            alert('An error occurred while submitting the form. Please try again.');
        }
    };

    return (
        <div>
            <UserNavbar />
            <Container className="mt-5">
                <Row className="justify-content-center">
                    <Col md={6}>
                        <div className="shadow p-4 rounded">
                            <h1 className="mb-4">Validation Page</h1>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="dob">
                                    <Form.Label>Date of Birth:</Form.Label><br />
                                    <Form.Control
                                        type="date"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="ssn">
                                    <Form.Label>SSN:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="ssn"
                                        value={formData.ssn}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ValidationPage;