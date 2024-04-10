import { useEffect, useState } from "react";
import blogImage from "./../../assets/undraw_Blog_post_re_fy5x.png";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({activeUser, setActiveUser}) {
  const [formData, setFormData] = useState({});
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

 useEffect(function(){
  if(activeUser){
    navigate('/home')
  }
 },[activeUser])

  async function handleFormSubmit(e) {
    e.preventDefault();
    setLoading(true)
    setShowErrorMsg(false)
    setErr(null)

    const res = await fetch("http://127.0.0.1:6969/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    if(data.status === "fail"){
      setErr(data.message)
      setLoading(false)
      setShowErrorMsg(true)
      return
    }
    setLoading(false)
    setActiveUser(data.data.user)
    navigate('/home')

  }
  return (
    <div className="login">
      <img src={blogImage} alt="People looking at a screen" />
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Write Wave</h1>
        {showErrorMsg && (
          <div className="error-msg">{err ? err : "Error while signing up"}</div>
        )}
        <input
          onChange={(e) => {
            setFormData((form) => ({ ...form, email: e.target.value }));
          }}
          type="text"
          required
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setFormData((form) => ({ ...form, password: e.target.value }));
          }}
          type="password"
          required
          placeholder="Password"
        />
        <button disabled = {loading} type="submit">{!loading?"Log in": "Loading"}</button>
        <p>Don't have an account <Link to='/signup'>sign up</Link> </p>
      </form>
    </div>
  );
}
