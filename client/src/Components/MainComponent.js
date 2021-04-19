import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import PrivateRoute from './ProtectedRoute/PrivateRoute';
import Login from './Login';
import Home from './CRM/Home';
import Profile from  './CRM/Profile';
import AddLeads from './CRM/AddLeads';
import AddUsers from './CRM/AddUsers';
import Footer from './Footer';
import HeaderBar from './HeaderBar';
import {
    Section
} from './MainComponents';
import Courses from './CRM/Admin/Courses';
import Comments from './CRM/Admin/Comments';
import Ads from './CRM/Admin/Ads';
import Status from './CRM/Admin/Status';

function Holder({match}){

    return(
        <>
            <HeaderBar match={match}/>
            <div style={{backgroundColor: '#E0E0F8', width: '100%', height: 'max-content'}}>
            <Section>
                <Switch>
                    <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} />} />
                    <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} />} />
                    <PrivateRoute path="/crm/addLeads" exact component={(props) => <AddLeads {...props} />} />
                    <PrivateRoute path="/crm/addUsers" exact component={(props) => <AddUsers {...props} />} />
                    <PrivateRoute path="/crm/courses" exact component={() => <Courses />} />
                    <PrivateRoute path="/crm/comments" exact component={() => <Comments />} />
                    <PrivateRoute path="/crm/ads" exact component={() => <Ads />} />
                    <PrivateRoute path="/crm/status" exact component={() => <Status />} />
                    <Redirect to = '/crm/home' />
                </Switch>
            </Section>
            <Footer />
            </div>
        </>
    )
}

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <PrivateRoute path="/crm" component={(props) => <Holder {...props} />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main