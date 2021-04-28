import axios from 'axios';
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
    updateLoggedInTimings()
    removeSessionStoragee('token')
}

export const updateLoggedInTimings = async () => {
    const date = new Date().getDate() >= 10 ? new Date().getDate().toString() : '0'+new Date().getDate().toString()
    const month = new Date().getMonth()+1 >= 10 ? (new Date().getMonth()+1).toString() : '0'+(new Date().getMonth()+1).toString()
    const year =  new Date().getFullYear().toString()
    const fullDate = year + '-' + month + '-' + date
    const logoutHours = new Date().getHours() >= 10 ? new Date().getHours().toString() : '0'+new Date().getHours().toString()
    const logoutMinutes = new Date().getMinutes() >= 10 ? new Date().getMinutes().toString() : '0'+new Date().getMinutes().toString()
    const logoutTime = logoutHours + ':' + logoutMinutes
    var data = []

    await axios.post(`${process.env.REACT_APP_USER}/getEmployeeTimings`, { email: JSON.parse(sessionStorage.getItem('user')).Email })
    .then(res => {
        const timings = JSON.parse(res.data.timings[0].Timings)
        if(timings){
            var dateExists = false
            timings.forEach(day => {
                if(day.date === fullDate){
                    dateExists = true
                    day.sessions.push([JSON.parse(sessionStorage.getItem('loginTime')), logoutTime])
                }
            })
            data = timings
            if(!dateExists){
                data = timings.push({ date: fullDate, sessions: [[JSON.parse(sessionStorage.getItem('loginTime')), logoutTime]]})
            }
        } else {
            data = [{ date: fullDate, sessions: [[JSON.parse(sessionStorage.getItem('loginTime')), logoutTime]]}]
        }
    })
    .catch(err => console.log(err))
    
    await axios.post(`${process.env.REACT_APP_USER}/setEmployeeTimings`, { email: JSON.parse(sessionStorage.getItem('user')).Email, jsonData: data })
    .then(res => {
        removeSessionStoragee('loginTime')
        removeSessionStoragee('user')
    })
    .catch(err => console.log(err))
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

    return userData
}