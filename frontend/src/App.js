import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { DashBoard } from "./components/DashBoard";

function App() {
  return (
    <div className="App h-screen">
      <Nav />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
