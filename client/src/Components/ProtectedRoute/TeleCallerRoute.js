import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import { decodeSessionStorage, isAuth } from '../../helpers/auth.helpers';

function TeleCallerRoute(props){

    const userData = decodeSessionStorage().payload

    return(
            isAuth() ?
                userData.Type === "TeleCaller" ?
                    <Route exact={props.exact} path={props.path} component={props.component} />
                : 
                <Redirect to="/" /> 
            : <Redirect to="/" />
    )
}

export default TeleCallerRoute;