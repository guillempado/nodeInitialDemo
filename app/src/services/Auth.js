import axios from "axios";

const API_URL = "http://localhost:3000/api_v1.0/auth/";

const login = async (username, password) => {
    try {
        return await axios.post(API_URL + "login", {
            username,
            password
        })
    }
    catch (e) {
        return e.response;
    }

}

const register = async (username, password) => {
    try{
        return await axios.post(API_URL + "signup", {
            username,
            password
        })
    }
    catch (e) {
        return e.response;
    }
}

const sendGoogleCode = async code => {
    try{
        return await axios.post(API_URL + "google", {
            code
        })
    }
    catch (e) {
        return e.response;
    }
}

const logout = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}

export {login, logout, register, getCurrentUser, sendGoogleCode};
