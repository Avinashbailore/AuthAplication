import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Link, useHistory } from 'react-router-dom';



export default function UpdateProfile() {

    const { currentUser, setCurrentUser } = useAuth();
    const [signUpData, setSignUpData] = useState({
        email: currentUser ? currentUser.email : '',
        password: '',
        confirmPassword: ''
    })

    const history = useHistory();

    console.log(currentUser);


    const [signUpError, setSignUpError] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = signUpData.email === '' || signUpData.password === '' || signUpData.confirmPassword === '';


    const singUpUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        let promises = [];
        if (signUpData.password !== signUpData.confirmPassword) {
            setLoading(false);
            return setSignUpError("Passwords do not match");
        }
        await auth.currentUser.updateEmail(signUpData.email)
            .then(() => { history.push("/") })
            .catch(() => { setSignUpError("Failed to update account") })
            .finally(() => { setLoading(true); })
        await auth.currentUser.updatePassword(signUpData.password)
            .then(() => {
                history.push('/');
            })
            .catch((error) => {
                const { message } = error;
                console.log(message);
                setSignUpError(message);
            })
            .finally(() => {
                setLoading(false)
            })
    }

    const changeSignUpData = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
    }

    return (
        <div className="w-100" style={{ maxWidth: 450 }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Update Profile</h2>
                    {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={signUpData.email} onChange={(e) => changeSignUpData(e)} defaultValue={currentUser.email} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={signUpData.password} onChange={(e) => changeSignUpData(e)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="confirmPassword" value={signUpData.confirmPassword} onChange={(e) => changeSignUpData(e)} />
                        </Form.Group>
                        <Row className="text-right">
                            <Col>
                                <Button className="btn-success" onClick={singUpUser} disabled={isValid || loading}>
                                    {loading ? 'Please wait...' : 'Update'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Cancel</Link>
            </div>
        </div>
    )
}
