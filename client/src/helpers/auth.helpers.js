const jwt = require('jsonwebtoken');

export const setLocalStorage = (key, value) => {
    if(window !== 'undefined'){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

export const removeLocalStorage = key => {
    if(window !== 'undefined'){
        localStorage.removeItem(key)
    }
}

export const isAuth = () => {
    const token = localStorage.getItem("status").substring(1, localStorage.getItem("status").length - 1);
    let state = "";

    //modify the backend to reverse this process.

    jwt.verify(token, process.env.REACT_APP_JWT, (err, decoded) => {
        if(err){
            removeLocalStorage("status");
            state = false;
        } else {
            state = true;
        }
    })

    if(state === true){
        return true
    } else {
        return false
    }
}