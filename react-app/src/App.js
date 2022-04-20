import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import User from "./pages/User";
import ChatsPage from "./pages/ChatsPage";
import NavBar from "./components/NavBar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import {Container} from 'react-bootstrap';

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ height: "100%", "background-color": "#57c15a"}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ChatsPage />} />
            <Route index element={<ChatsPage />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="User" element={<User />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default App;
