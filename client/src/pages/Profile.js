import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserDescription from "../components/Profile/UserDescription";
import "./Profile.css";

export default function Profile({ activeUser,setActiveUser }) {
  const navigate = useNavigate();
  useEffect(function () {
    if (activeUser) {
      navigate("/profile");
    }
  }, []);
  return (
    <div className="profile">
     {
        activeUser ?  <UserDescription activeUser={activeUser} setActiveUser={setActiveUser} /> : <div>Loading</div>
     }
    </div>
  );
}
