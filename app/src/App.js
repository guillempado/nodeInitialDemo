import './App.css';
import { Routes, Route } from "react-router-dom";
import ChatsController from "./components/ChatsController";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
      <div>
          <Routes>
              <Route path="/" element={<Login />} />
              {/*<Route exact path={["/", "/chats"]} element={<ChatsController />} />

               <Route path="/about" element={<About />} />
               <Route path="/settings" element={<Settings />} />
               <Route path="*" element={<NotFound />} />
               */}
          </Routes>
      </div>

  );
}

export default App;
