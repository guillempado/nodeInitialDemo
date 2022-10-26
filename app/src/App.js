import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import ChatsController from "./components/ChatsController";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUp from "./components/SignUp";


function App() {

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/chats" element={<ChatsController />} />
            <Route path="*" element={ <Navigate to="/login" /> } />
        </Routes>
    );
}

export default App;
