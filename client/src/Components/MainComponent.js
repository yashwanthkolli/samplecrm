import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';

function CRM(){
    return(
        <Switch>
            <Route path="/crm/home" exact component={(props) => <Home {...props} /> } />
        </Switch>
    )
}

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/crm" component={(props) => <CRM {...props} />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main