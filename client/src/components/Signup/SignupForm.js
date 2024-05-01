import { useEffect, useState } from "react";
import blogImage from "./../../assets/undraw_Blog_post_re_fy5x.png";
import "./SignupForm.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignUpForm({
  activeUser,
  setActiveUser,
  signupFormData,
  setSignupFormData,
}) {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (activeUser) {
        navigate("/feed");
      }
    },
    [activeUser]
  );

  async function handleEmailVerification(e) {
    e.preventDefault();
    setLoading(true)
    const res = await fetch(
      "https://writewave-backend-api.onrender.com/users/verify",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: signupFormData.name,
          email: signupFormData.email,
        }),
      }
    );
    const data = await res.json();
    console.log(data);
    if (data.status === "fail") {
      setShowErrorMsg(true);
      setErr(data.message);
      setLoading(false);
      return;
    }
    setSignupFormData((form)=>({...form, verificationCode:data.code}))
    setLoading(false)
    navigate("/verifyemail");
  }

  return (
    <div className="signup">
      <img src={blogImage} alt="People looking at a screen" />
      <form onSubmit={(e) => handleEmailVerification(e)}>
        <h1>Write Wave</h1>

        {showErrorMsg && (
          <div className="error-msg">
            {err ? err : "Error while signing up"}
          </div>
        )}

        <input
          required
          placeholder="Name"
          onChange={(e) =>
            setSignupFormData((form) => ({ ...form, name: e.target.value }))
          }
        />
        <input
          onChange={(e) => {
            setSignupFormData((form) => ({ ...form, email: e.target.value }));
          }}
          type="text"
          required
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setSignupFormData((form) => ({
              ...form,
              password: e.target.value,
            }));
          }}
          type="password"
          required
          placeholder="Password"
        />
        <button disabled={loading} type="submit">
          {!loading ? "Sign up" : "Loading"}
        </button>
        <p>
          Already have an account <Link to="/login">log in</Link>
        </p>
      </form>
    </div>
  );
}
