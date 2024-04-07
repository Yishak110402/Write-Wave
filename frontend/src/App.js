import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import './index.css'

export default function App() {
  const [activeUser, setActiveUser] = useState(null)

  return (
    <main>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login setActiveUser={setActiveUser} />} />
        <Route path="/home" element={<Homepage activeUser={activeUser}/>} />
      </Routes>
      </BrowserRouter>
    </main>
  );
}
