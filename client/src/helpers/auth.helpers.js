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
    if(sessionStorage.getItem("token")){
        const token = sessionStorage.getItem("token");
        let state = false;

        //modify the backend to reverse this process.

        jwt.verify(token, process.env.REACT_APP_JWT, (err, decoded) => {
            if(err){
                removeSessionStoragee("token");
                state = false;
            } else {
                state = true;
            }
        })
        return state;
    } else {
        return false;
    }
}

export const signout = () => {
    removeSessionStoragee('token')
    removeSessionStoragee('user')
}

export const updateUserTimingsOnLogin = async (loginTime, loggedInDuration) => {
    if(loginTime && loggedInDuration){
        const loggedInHours = moment(loggedInDuration, 'HH:mm').hours()
        const loggedInMinutes = moment(loggedInDuration, 'HH:mm').minutes()
        const logoutTime = moment(loginTime, 'HH:mm').add(loggedInHours, 'h').add(loggedInMinutes, 'm').format('HH:mm')
        const fullDate = moment(new Date()).format('YYYY-MM-DD')
        
        let data = []

        await axios.post(`${process.env.REACT_APP_USER}/getEmployeeTimings`, { email: JSON.parse(sessionStorage.getItem('user')).Email, prevEmail: JSON.parse(localStorage.getItem('previousLogin')) })
        .then(res => {
            const timings = JSON.parse(res.data.timings[0].Timings)
            
            if(timings){
                var dateExists = false
                timings.forEach(day => {
                    if(day.date === fullDate){
                        dateExists = true
                        day.sessions.push([JSON.parse(localStorage.getItem('loginTime')), logoutTime])
                    }
                })
                data = timings
                if(!dateExists){
                    timings.push({ date: fullDate, sessions: [[JSON.parse(localStorage.getItem('loginTime')), logoutTime]]})
                    data = timings
                }
            } else {
                data = [{ date: fullDate, sessions: [[JSON.parse(localStorage.getItem('loginTime')), logoutTime]]}]
            }
        })
        .catch(err => console.log(err))
        
        await axios.post(`${process.env.REACT_APP_USER}/setEmployeeTimings`, { email: JSON.parse(sessionStorage.getItem('user')).Email, jsonData: data, prevEmail: JSON.parse(localStorage.getItem('previousLogin')) })
        .then(res => null)
        .catch(err => console.log(err))
    }
} 
