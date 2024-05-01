import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";
import emailImg from "./../assets/mailbox.png";

export default function VerifyEmail({ signupFormData, setActiveUser }) {
  const [verification, setVerification] = useState(null);
  const [err, setErr] = useState(null);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    useEffect(function () {
      if (
        !signupFormData ||
        signupFormData.name.length === 0 ||
        signupFormData.email === ""
      ) {
        navigate("/signup");
        return;
      }
    }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setShowErrorMsg(false)
    setErr(null)
    setLoading(true);
    if (Number(verification) !== Number(signupFormData.verificationCode)) {
      setErr("Incorrect verification code");
      setShowErrorMsg(true);
      setLoading(false)
      return;
    }
    setShowErrorMsg(false);
    setErr(null);
    setLoading(true);
    const renderURL = "https://writewave-backend-api.onrender.com/users/signup";

    const res = await fetch(renderURL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(signupFormData),
    });
    if (!res.ok) {
      setShowErrorMsg(true);
      setLoading(false);
      return;
    }
    const data = await res.json();
    console.log(data);
    if (data.status === "fail") {
      setShowErrorMsg(true);
      setErr(data.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    setActiveUser(data.data.user);
    navigate("/feed");
  }

  return (
    <div className="verify-email">
      <img src={emailImg} />
      <div className="verify-form">
        <h1>Hello, {signupFormData.name}</h1>
        <h2>
          Please check your email <span>{signupFormData.email}</span> for the
          verification code we sent to you
        </h2>
        <div>
          <input
            type="number"
            max="999999"
            onChange={(e) => setVerification(e.target.value)}
          />
          <button disabled={loading} onClick={(e) => handleFormSubmit(e)}>{loading ? "Verifying..." : "Verify"}</button>
          {showErrorMsg && <div className="error-msg">{err}</div>}
        </div>
      </div>
    </div>
  );
}
