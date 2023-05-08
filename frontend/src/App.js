import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Nav } from "./components/Nav";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { DashBoard } from "./components/DashBoard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Tasks from "./components/Tasks";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="App h-screen">
      <QueryClientProvider client={queryClient}>
        <Nav />
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="tasks" element={<Tasks />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
