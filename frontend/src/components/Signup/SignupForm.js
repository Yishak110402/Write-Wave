import { useState } from "react";
import blogImage from "./../../assets/undraw_Blog_post_re_fy5x.png";
import "./SignupForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm() {
  const [formData, setFormData] = useState({});
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [err, setErr] = useState(null)
  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setShowSuccessMsg(false);
    setShowErrorMsg(false);
    setErr(null)

    const res = await fetch("http://127.0.0.1:6969/users/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if(!res.ok){
      setShowErrorMsg(true)
    }
    const data = await res.json();
    console.log(data);
    if (data.status === "fail") {
      setShowErrorMsg(true);
      setErr(data.message)
      return;
    }
    if (data.status === "success") {
      setShowSuccessMsg(true);
    }
    // navigate('/login')
  }
  return (
    <div className="signup">
      <img src={blogImage} />
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Write Wave</h1>
        {showSuccessMsg && (
          <div className="success-msg"> Signup successful please <Link to='/login'>log in</Link></div>
        )}
        {showErrorMsg && (
          <div className="error-msg">{err ? err : "Error while signing up"}</div>
        )}

        <input
          required
          placeholder="Name"
          onChange={(e) =>
            setFormData((form) => ({ ...form, name: e.target.value }))
          }
        />
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
        <button type="submit">Sign up</button>
        <p>
          Already have an account <Link to="/login">log in</Link>
        </p>
      </form>
    </div>
  );
}
