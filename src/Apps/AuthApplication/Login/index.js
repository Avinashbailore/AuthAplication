import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Link, useHistory } from 'react-router-dom'



export default function Login() {

    const { setCurrentUser } = useAuth();
    const [loginData, setloginData] = useState({
        email: '',
        password: ''
    })

    const history = useHistory();


    const [signUpError, setSignUpError] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = loginData.email === '' || loginData.password === '';

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        await auth.signInWithEmailAndPassword(loginData.email, loginData.password).then((user) => {
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

    const changeloginData = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }



    return (
        <div className="w-100" style={{ maxWidth: 450 }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Login</h2>
                    {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={loginData.email} onChange={(e) => changeloginData(e)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={loginData.password} onChange={(e) => changeloginData(e)} />
                        </Form.Group>
                        <Row className="text-right">
                            <Col>
                                <Button className="btn-success" onClick={loginUser} disabled={isValid || loading}>
                                    {loading ? 'Please wait...' : 'Submit'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <Link to="/forgot-password">Forgot Password</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    )
}
