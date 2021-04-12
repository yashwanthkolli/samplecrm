import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';
import Sidebar from './CRM/Sidebar';

function CRM(){

    return(
        <>
            <Switch>
                <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} />} />
                <Redirect to = '/crm/home' />
            </Switch>
        </>
    )
}

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/crm" component={(props) => <Sidebar {...props} navigate = {CRM} />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main