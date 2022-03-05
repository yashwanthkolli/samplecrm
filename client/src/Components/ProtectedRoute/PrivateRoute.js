import React from 'react';
import {isAuth} from '../../helpers/auth.helpers';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props){

    return(
        isAuth() ? 
            <Route path={props.path} exact={props.exact} component={props.component} />
        :
        <Redirect to = '/' />
    )
}

export default PrivateRoute;