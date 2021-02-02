import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Link, useHistory } from 'react-router-dom';



export default function SignUp() {

    const { setCurrentUser } = useAuth();
    const [signUpData, setSignUpData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const history = useHistory();


    const [signUpError, setSignUpError] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = signUpData.email === '' || signUpData.password === '' || signUpData.confirmPassword === '';

    const singUpUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (signUpData.password !== signUpData.confirmPassword) setSignUpError("Passwords do not match");
        await auth.createUserWithEmailAndPassword(signUpData.email, signUpData.password).then((user) => {
            console.log(user);
            setCurrentUser(user.user);
            history.push('/');
            return user;
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
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={signUpData.email} onChange={(e) => changeSignUpData(e)} />
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
                                    {loading ? 'Please wait...' : 'Submit'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
