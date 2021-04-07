import React from 'react';
import {
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import Home from './Home';

function Main(){

    return(
        <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Main