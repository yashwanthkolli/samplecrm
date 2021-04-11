import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Login from './Login';

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={(props) => <Login {...props}/>} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main