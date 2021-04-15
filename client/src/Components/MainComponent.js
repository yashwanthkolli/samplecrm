import React, {useState} from 'react';
import {
    Switch,
    Route,
    Redirect,
    useRouteMatch
} from 'react-router-dom';
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';
// import Holders from './CRM/Holder';
import Profile from  './CRM/Profile';
import AddLeads from './CRM/AddLeads';
import AddUsers from './CRM/AddUsers';
import Footer from './Footer';
import HeaderBar from './HeaderBar';

function Holder({match}){

    return(
        <>
            <HeaderBar match={match}/>
            {/* <Holder> */}
                <Switch>
                    <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} />} />
                    <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} />} />
                    <PrivateRoute path="/crm/addLeads" exact component={(props) => <AddLeads {...props} />} />
                    <PrivateRoute path="/crm/addUsers" exact component={(props) => <AddUsers {...props} />} />
                    <Redirect to = '/crm/home' />
                </Switch>
            {/* </Holder> */}
            <Footer />
        </>
    )
}

function CRM(){

    let { path } = useRouteMatch();

    return(
        <>
            <Switch>
                <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} path={path} />} />
                <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} path={path} />} />
                <PrivateRoute path="/crm/addLeads" exact component={(props) => <AddLeads {...props} />} />
                <PrivateRoute path="/crm/addUsers" exact component={(props) => <AddUsers {...props} />} />
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