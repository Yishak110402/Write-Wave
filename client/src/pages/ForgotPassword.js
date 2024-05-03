import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword({ verifiedEmail, setVerifiedEmail }) {
  const [sending, setSending] = useState(false);
  const [verificationCode, setVerificationCode] = useState(null);
  const [enteredCode, setEnteredCode] = useState(null);
  const [showCodeInput, setShowCodeInput] = useState(true);
  const [err, setErr] = useState(null);
  const [showErr, setShowErr] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const navigate = useNavigate();

  async function sendVerificationCode() {
    setSending(true);
    setShowErr(false);
    setErr(null);
    try {
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/resetcode/${verifiedEmail}`
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        setSending(false);
        setErr(data.message);
        setShowErr(true);
        return;
      }
      setVerificationCode(data.code);
      setShowCodeInput(true);
      setSending(false);
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    } catch (error) {
      setErr(error);
    }
  }

   function verifyCode() {
    setShowErr(false);
    if (verificationCode !== Number(enteredCode)) {
      setErr("Incorrect code");
      setShowErr(true);
      return;
    }
    navigate("/resetpassword");

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
            onChange={(e) => setVerifiedEmail(e.target.value)}
            disabled={showCodeInput}
            required
            // value={"yishak.110402@gmail.com"}
          />
          <button
            disabled={sending || showCodeInput}
            onClick={sendVerificationCode}
          >
            {sending ? "Sending" : "Send verification code"}
          </button>
        </div>
        {showErr && <div className="error-msg">{err}</div>}
      </div>
      <div className="code-input">
        {showCodeInput && (
          <>
            <button onClick={() => setShowCodeInput(false)}>
              Change email
            </button>
            <p>
              Enter the verification code you received through your email{" "}
              {verifiedEmail}
            </p>
            <input
              type="number"
              placeholder="Verification code"
              onChange={(e) => setEnteredCode(e.target.value)}
            />
            <button disabled={sending} onClick={verifyCode}>
              Verify code
            </button>
          </>
        )}
      </div>
    </div>
  );
}
