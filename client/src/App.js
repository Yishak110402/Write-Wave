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
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

export default function App() {
  const [activeUser, setActiveUser] = useState(null);
  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(function () {
    const storedValue = localStorage.getItem("activeUser");
    if (storedValue == null) {
      return;
    }
    setActiveUser(JSON.parse(storedValue));
  }, []);

  useEffect(
    function () {
      if (activeUser != null) {
        localStorage.setItem("activeUser", JSON.stringify(activeUser));
      } else {
        localStorage.removeItem("activeUser");
      }
    },
    [activeUser, setActiveUser]
  );

  return (
    <main>
      <BrowserRouter>
        <Navbar activeUser={activeUser} setActiveUser={setActiveUser} />
        <Routes>
          <Route path="/" element={<Homepage activeUser={activeUser} />} />
          <Route
            path="/verifyemail"
            element={
              <VerifyEmail
                activeUser={activeUser}
                signupFormData={signupFormData}
                setSignupFormData={setSignupFormData}
                setActiveUser={setActiveUser}
              />
            }
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/signup"
            element={
              <Signup
                activeUser={activeUser}
                setActiveUser={setActiveUser}
                signupFormData={signupFormData}
                setSignupFormData={setSignupFormData}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login activeUser={activeUser} setActiveUser={setActiveUser} />
            }
          />
          <Route path="/feed" element={<Feed activeUser={activeUser} />} />
          <Route
            path="/feed/:id"
            element={<OpenPost activeUser={activeUser} />}
          />
          <Route
            path="/newblog"
            element={<AddBlog activeUser={activeUser} />}
          />
          <Route
            path="/profile"
            element={
              <Profile activeUser={activeUser} setActiveUser={setActiveUser} />
            }
          />
          <Route path="/editblog/:id" element={<EditBlog />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
