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
import HeaderBar from './HeaderBar';
import {
    Section
} from './MainComponents';
import Offices from './CRM/Offices';
import AddSupervisor from './CRM/AddSupervisor';
import ViewRegisters from './CRM/ViewRegisters';
import StaffUsers from './CRM/StaffUsers';
import AddStaff from './CRM/AddStaff';
import StaffRegisters from './CRM/StaffRegisters';
import AddRegisters from './CRM/AddRegisters';
import AddAdmin from './CRM/AddAdmin';



function Holder({match}){

    return(
        <>
            <HeaderBar match={match}/>
            <div style={{background: '#E0E0F8', width: '100%', height: 'max-content'}}>
            <Section>
                <Switch>
                
                    <PrivateRoute path="/crm/home" exact component={(props) => <Home {...props} />} />
                    <PrivateRoute path="/crm/profile" exact component={(props) => <Profile {...props} />} />
                    <PrivateRoute path="/crm/offices" exact component={(props) => <Offices {...props} />} />
                    <PrivateRoute path="/crm/addSupervisor" exact component={(props) => <AddSupervisor {...props} />} /> 
                    <PrivateRoute path="/crm/addAdmin" exact component={(props) => <AddAdmin {...props} />} /> 
                    <PrivateRoute path="/crm/viewRegisters" exact component={() => <ViewRegisters />} />
                    <PrivateRoute path="/crm/addRegisters" exact component={() => <AddRegisters />} />


                    <PrivateRoute path="/crm/supervisor/StaffUsers" exact component={(props) => <StaffUsers {...props} />} />
                    <PrivateRoute path="/crm/supervisor/profile" exact component={(props) => <Profile {...props} />} />
                    <PrivateRoute path="/crm/supervisor/AddStaff" exact component={(props) => <AddStaff {...props} />} />
                    

                    <PrivateRoute path="/crm/staff/profile" exact component={(props) => <Profile {...props} />} />
                    <PrivateRoute path="/crm/staff/registers" exact component={(props) => <StaffRegisters {...props} />} />
                    <Redirect to = '/crm/home' />
                </Switch>
            </Section>
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