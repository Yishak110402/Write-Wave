import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import Feed from "./pages/Feed";
import AddBlog from "./pages/AddBlog";
import OpenPost from "./pages/OpenPost";
import Profile from "./pages/Profile";
import EditBlog from "./pages/EditBlog";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";


export default function App() {
  const [activeUser, setActiveUser] = useState(null)

  useEffect(function(){
    const storedValue = localStorage.getItem('activeUser')
    if(storedValue == null){
      return
    }
    setActiveUser(JSON.parse(storedValue))
    },[])

  useEffect(function(){
    if(activeUser!= null){
    localStorage.setItem('activeUser', JSON.stringify(activeUser))
    }
  },[activeUser, setActiveUser])

  return (
    <main>
      <BrowserRouter>
        <Navbar activeUser={activeUser} setActiveUser={setActiveUser} />
        <Routes>
          <Route path="/" element={<Homepage activeUser={activeUser}/>} />
          <Route
            path="/signup"
            element={<Signup activeUser={activeUser} setActiveUser={setActiveUser} />}
          />
          <Route
            path="/login"
            element={<Login activeUser={activeUser} setActiveUser={setActiveUser} />}
          />
          <Route path="/feed" element={<Feed activeUser={activeUser} />} />
          <Route path="/feed/:id" element={<OpenPost activeUser={activeUser} />} />
          <Route
            path="/newblog"
            element={<AddBlog activeUser={activeUser} />}
          />
          <Route path="/profile" element={<Profile activeUser={activeUser} setActiveUser={setActiveUser}/>}/>
          <Route path="/editblog/:id" element={<EditBlog/>}/>
          <Route path="*" element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
