import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Feed from "./pages/Feed";
import AddBlog from "./pages/AddBlog";
import OpenPost from "./pages/OpenPost";
import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";


export default function App() {
  const [activeUser, setActiveUser] = useState({
    _id: "6613724b525f9e1d5447c3a8",
    name: "Yishak Hailu",
    email: "yishak@gmail.com",
  });

  return (
    <main>
      <BrowserRouter>
        <Navbar activeUser={activeUser} setActiveUser={setActiveUser} />
        <Routes>
          <Route path="/" element={<Feed activeUser={activeUser}/>} />
          <Route
            path="/signup"
            element={<Signup setActiveUser={setActiveUser} />}
          />
          <Route
            path="/login"
            element={<Login setActiveUser={setActiveUser} />}
          />
          <Route path="/home" element={<Feed activeUser={activeUser} />} />
          <Route path="/home/:id" element={<OpenPost />} />
          <Route
            path="/newblog"
            element={<AddBlog activeUser={activeUser} />}
          />
          <Route path="/profile" element={<Profile activeUser={activeUser}/>}/>
          <Route path="/editblog/:id" element={<EditBlog/>}/>
        </Routes>
      </BrowserRouter>
    </main>
  );
}
