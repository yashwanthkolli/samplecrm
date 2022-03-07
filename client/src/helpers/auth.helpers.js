import axios from 'axios';
import * as moment from 'moment';
const jwt = require('jsonwebtoken');

export const setSessionStorage = (key, value) => {
    if(window !== 'undefined'){
        sessionStorage.setItem(key, value)
    }
}

export const removeSessionStoragee = key => {
    if(window !== 'undefined'){
        sessionStorage.removeItem(key)
    }
}

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = (key) => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

export const isAuth = () => {
    const token = sessionStorage.getItem("token");
    let state = false;

    //modify the backend to reverse this process.

    jwt.verify(token, process.env.REACT_APP_JWT_PAYLOAD, (err, decoded) => {

        if(err){
            removeSessionStoragee("token");
            state = false;
        } else {
            state = true;
        }
    })
    return state;
}

export const signout = () => {
    removeSessionStoragee('token')
    removeSessionStoragee('user')
}

export const decodeSessionStorage = () => {

    const payload_token = sessionStorage.getItem("user");
    var userData = {};

    jwt.verify(payload_token, process.env.REACT_APP_JWT_PAYLOAD, (err, decoded) => {
        if(err){
            userData = {};
        }
        userData = decoded
    })
    console.log(userData)
    return userData
}