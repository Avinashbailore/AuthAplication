import React from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';



export default function DashBoard() {

    const { currentUser } = useAuth();
    console.log(currentUser);

    const logOutUser = () => {
        auth.signOut();
    }

    return (
        <div>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    <strong>Email: </strong>{currentUser && currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
                        Update Profile
                    </Link>
                </Card.Body>
            </Card>
            <Row className="text-right mt-2">
                <Col>
                    <Button className="btn-info" onClick={logOutUser}>
                        Log Out
                    </Button>
                </Col>
            </Row>
        </div>
    )
}
