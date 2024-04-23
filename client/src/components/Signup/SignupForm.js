import { useEffect, useState } from "react";
import blogImage from "./../../assets/undraw_Blog_post_re_fy5x.png";
import "./SignupForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm({activeUser, setActiveUser}) {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:''
  });
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

 useEffect(function(){
  if(activeUser){
    navigate('/feed')
  }
 },[activeUser])

  async function handleFormSubmit(e) {
    e.preventDefault();
    // setShowSuccessMsg(false);
    setShowErrorMsg(false);
    setErr(null)
    setLoading(true)
    const renderURL = "https://writewave-backend-api.onrender.com/users/signup"

    const res = await fetch(renderURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if(!res.ok){
      setShowErrorMsg(true)
      setLoading(false)
      return
    }
    const data = await res.json();
    console.log(data);
    if (data.status === "fail") {
      setShowErrorMsg(true);
      setErr(data.message)
      setLoading(false)
      return;
    }
    if (data.status === "success") {
      setShowSuccessMsg(true);
      setLoading(false)
    }
    setLoading(false)
    setActiveUser(data.data.user)
    navigate('/feed')
  }
  return (
    <div className="signup">
      <img src={blogImage} alt="People looking at a screen" />
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Write Wave</h1>
       
        {showErrorMsg && (
          <div className="error-msg">{err ? err : "Error while signing up"}</div>
        )}

        <input
          value={formData.name}
          required
          placeholder="Name"
          onChange={(e) =>
            setFormData((form) => ({ ...form, name: e.target.value }))
          }
        />
        <input
          value={formData.email}
          onChange={(e) => {
            setFormData((form) => ({ ...form, email: e.target.value }));
          }}
          type="text"
          required
          placeholder="Email"
        />
        <input
          value={formData.password}
          onChange={(e) => {
            setFormData((form) => ({ ...form, password: e.target.value }));
          }}
          type="password"
          required
          placeholder="Password"
        />
        <button disabled={loading} type="submit">{!loading?"Sign up":"Loading"}</button>
        <p>
          Already have an account <Link to="/login">log in</Link>
        </p>
      </form>
    </div>
  );
}
