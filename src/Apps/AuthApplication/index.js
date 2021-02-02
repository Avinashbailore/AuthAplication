import React from 'react';
import SignUp from './SignUp/index';
import DashBoard from './DashBoard/index';
import Login from './Login/index';
import '../../Theme/styles.scss';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../../Contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'



const AuthApplication = () => {
    return (
        <Container className="d-flex align-items justify-content-center mt-3">
            <Router>
                <AuthProvider>
                    <Switch>
                        <Route exact path="/" component={DashBoard} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        {/* <SignUp /> */}
                    </Switch>
                </AuthProvider>
            </Router>
        </Container>
    )
}

export default AuthApplication