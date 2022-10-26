import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ChatsController from "./components/ChatsController";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";
import { useState } from "react";



function App() {

    const [appState, setAppState] = useState({
        token: ""
    })

    const setToken = token => {
        setAppState({token})
    }

    return (
        <Routes>
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/signup" element={<SignUp setToken={setToken}/>} />
            <Route path="/chats" element={<ChatsController token={appState.token}/>} />
            <Route path="*" element={ <Navigate to="/login" /> } />
        </Routes>
    );
}

export default App;
