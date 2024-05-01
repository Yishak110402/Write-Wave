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
  //   useEffect(function () {
  //     if (
  //       !signupFormData ||
  //       signupFormData.name.length === 0 ||
  //       signupFormData.email === ""
  //     ) {
  //       navigate("/signup");
  //       return;
  //     }
  //   }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (verification !== signupFormData.verificationCode) {
      setErr("Incorrect verification code");
      setShowErrorMsg(true);
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
    if (data.status === "success") {
      //   setShowSuccessMsg(true);
      setLoading(false);
    }
    setLoading(false);
    // setActiveUser(data.data.user)
    navigate("/feed");
  }

  return (
    <div className="verify-email">
      <img src={emailImg} />
      <div className="verify-form">
        <h1>Hello, Yishak hailu</h1>
        <h2>
          Please check your email <span>yishakhailu@gmail.com</span> for the
          verification code we sent to you
        </h2>
        <div>
          <input type="number" max="999999" />
          <button onChange={(e) => setVerification(e.target.value)}>
            Verify
          </button>
        </div>
      </div>
    </div>
  );
}
