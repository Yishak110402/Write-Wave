import { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);
  const [sending, setSending] = useState(false)
  const [verificationCode, setVerificationCode] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [err, setErr] = useState(null)
  const [showErr, setShowErr] = useState(false)

  async function sendVerificationCode() {
    setSending(true)
    setShowErr(false)
    setErr(null)
    try {
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/resetcode/${email}`
      );
      const data = await res.json()
      console.log(data);
      if(data.status === "fail"){
        setErr(data.message)
        setShowErr(true)
        return
      }
      setVerificationCode(data.code)
      setShowCodeInput(true);
    } catch (error) {
      setErr(error)

    }
  }

  async function verifyCode(){

  }

  return (
    <div className="forgot-password">
      <div className="email-input">
        <h1>Reset Password</h1>
        <p>Please enter the email address linked with your account</p>
        <div>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            disabled={showCodeInput}
            required
          />
          <button onClick={sendVerificationCode}>Send verification code</button>
        </div>
       {showErr &&  <div className="error-msg">{err}</div>}
      </div>
      <div className="code-input">
        {showCodeInput && (
          <>
            <button onClick={() => setShowCodeInput(false)}>
              Change email
            </button>
            <h1>
              Enter the verification code you received through you email {email}
            </h1>
            <input
              type="number"
              placeholder="Verification code"
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <button>Verify code</button>
          </>
        )}
      </div>
    </div>
  );
}
