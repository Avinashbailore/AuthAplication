import React from 'react';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';


const DashBoard = () => {

    const { currentUser } = useAuth();
    console.log(currentUser);

    const history = useHistory();

    const logOutUser = async () => {
        await auth.signOut();
        history.push('/login');
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

export default DashBoard
