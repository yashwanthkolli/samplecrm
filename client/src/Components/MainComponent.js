import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';
import Holder from './CRM/Holder';
import Profile from  './CRM/Profile';

function CRM(){

    return(
        <>
            <Switch>
                <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} />} />
                <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} />} />
                <Redirect to = '/crm/home' />
            </Switch>
        </>
    )
}

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/crm" component={(props) => <Holder {...props} navigate = {CRM} />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main