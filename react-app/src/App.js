import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import NoPage from './pages/NoPage';
import Register from './pages/Register';
import User from './pages/User';
import ChatsPage from './pages/ChatsPage';
import NavBar from './components/NavBar';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className = "App">
      <BrowserRouter >
        <NavBar />
        <Routes>
          <Route path="/" element={<ChatsPage />} />
          <Route index element={<ChatsPage />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="User" element={<User />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
