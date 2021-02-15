import React from 'react';
import SignUp from './SignUp/index';
import DashBoard from './DashBoard/index';
import Login from './Login/index';
import ForgotPassword from './ForgotPassword/index';
import UpdateProfile from './UpdateProfile/index';
import '../../Theme/styles.scss';
import { Container } from 'react-bootstrap'
import { AuthProvider, currentUser } from '../../Contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'



const AuthApplication = () => {

    return (
        <Container className="d-flex align-items justify-content-center mt-3">
            <Router>
                <AuthProvider>
                    <Switch>
                        <PrivateRoute exact path="/" component={DashBoard} />
                        <PrivateRoute path="/update-profile" component={UpdateProfile} />
                        <Route path="/signup" component={SignUp} />
                        <Route path="/login" component={Login} />
                        <Route path="/forgot-password" component={ForgotPassword} />
                        {/* <Route path="/update-profile" component={UpdateProfile} /> */}
                    </Switch>
                </AuthProvider>
            </Router>
        </Container>
    )
}

export default AuthApplication