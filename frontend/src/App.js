import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <main>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<Homepage/>} />
      </Routes>
      </BrowserRouter>
    </main>
  );
}
