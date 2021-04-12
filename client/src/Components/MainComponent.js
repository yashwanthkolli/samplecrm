import React from 'react';
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';
import Holder from './CRM/Holder';
import Profile from  './CRM/Profile';

function CRM(){

    let { path } = useRouteMatch();

    return(
        <>
            <Switch>
                <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} path={path} />} />
                <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} path={path}/>} />
                <Redirect to = '/crm/home' />
            </Switch>
        </>
    )
}

function Main(){

    let { path } = useRouteMatch();

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/crm" component={(props) => <Holder {...props} navigate = {CRM} path={path} />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main