import React, { useState } from 'react';
import { Card, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../../Contexts/AuthContext';
import { auth } from '../../../FireBase/firebase.js';
import { Link, useHistory } from 'react-router-dom'



export default function ForgotPassword() {

    const { setCurrentUser } = useAuth();
    const [loginData, setloginData] = useState({
        email: ''
    })

    const history = useHistory();


    const [signUpError, setSignUpError] = useState('');
    const [emailSent, setEmailSent] = useState('');
    const [loading, setLoading] = useState(false);

    const isValid = loginData.email === ''

    const changeloginData = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const resetPassword = async () => {
        setEmailSent('')
        try {
            setSignUpError('');
            setLoading(true);
            await auth.sendPasswordResetEmail(loginData.email);
            setEmailSent('Check your inbox for further instructions!')
        } catch (error) {
            const { message } = error;
            console.log(message);
            setSignUpError(message);
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="w-100" style={{ maxWidth: 450 }}>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-3">Reset Password</h2>
                    {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                    {emailSent && <Alert variant="primary">{emailSent}</Alert>}
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="email" value={loginData.email} onChange={(e) => changeloginData(e)} />
                        </Form.Group>
                        <Row>
                            <Col>
                                <Button disabled={!loginData.email || loading} className="w-100" onClick={() => resetPassword()}>
                                    {loading ? 'Sending Email...' : 'Reset Password'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/login">Login</Link>
            </div>
        </div>
    )
}
