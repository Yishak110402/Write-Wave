import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./VerifyEmail.css";
import emailImg from "./../assets/mailbox.png";

export default function VerifyEmail({ signupFormData }) {
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
          <button>Verify</button>
        </div>
      </div>
    </div>
  );
}
