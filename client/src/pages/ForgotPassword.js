import { useState } from "react";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState(null);
  return (
    <div className="forgot-password">
      <h1>Reset Password</h1>
      <p>Please enter the email address linked with your account</p>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send verification code</button>
      </div>
    </div>
  );
}
