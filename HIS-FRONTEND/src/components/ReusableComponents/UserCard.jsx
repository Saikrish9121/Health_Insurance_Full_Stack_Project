import React from 'react'
import { Card, Col } from 'react-bootstrap';

export const UserCard = ({ title, bgColor, data }) => {
    return (
        <Col md={3}>
            <Card className={`text-center ${bgColor} text-white mt-4`} style={{ height: '150px' }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{data}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}
