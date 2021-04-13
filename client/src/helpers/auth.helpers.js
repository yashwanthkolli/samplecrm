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
    if(localStorage.getItem("token")){
        const token = localStorage.getItem("token").substring(1, localStorage.getItem("token").length - 1);
        let state = "";

        //modify the backend to reverse this process.

        jwt.verify(token, process.env.REACT_APP_JWT, (err, decoded) => {
            if(err){
                removeLocalStorage("token");
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
}

export const signout = () => {
    removeLocalStorage('token')
    removeLocalStorage('user')
}

export const updateLocalStorage = (k, value) => {
    var localStore = localStorage.getItem('user')
    for(var key in localStore){
        if(localStore.hasOwnProperty(key)){
            if(key === k){
                localStore[k] = value;
            }
        }
    }
    console.log(localStore);
    setLocalStorage('user', localStore);
}