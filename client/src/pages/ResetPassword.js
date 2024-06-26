import { Link, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import resetPasswordImg from "./../assets/forgotpassword.png";
import { useEffect, useState } from "react";

export default function ResetPassword({ verifiedEmail }) {
  const [updating, setUpdating] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [err, setErr] = useState(null);
  const [showErr, setShowErr] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  useEffect(function () {
    if (!verifiedEmail) {
      navigate("/login");
    }
  }, []);

  async function resetPassword(e) {
    e.preventDefault();
    setUpdating(true);
    setErr(null);
    setShowErr(false);
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErr("Passwords don't match");
      setShowErr(true);
      setUpdating(false);
      return;
    }
    try {
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/resetpassword/${verifiedEmail}`,
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(passwords),
        }
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "fail") {
        setErr(data.message);
        setShowErr(true);
        setUpdating(false);
        return;
      }
      setUpdated(true);
      setUpdating(false);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="reset-password">
      <img src={resetPasswordImg} />
      <div className="reset-form">
        <h1>Reset Password for {verifiedEmail}</h1>
        <form onSubmit={(e) => resetPassword(e)}>
          <div>
            <p>Enter new password</p>
            <input
              type="text"
              onChange={(e) =>
                setPasswords((p) => ({ ...p, newPassword: e.target.value }))
              }
            />
          </div>
          <div>
            <p>Confirm new password</p>
            <input
              type="text"
              onChange={(e) =>
                setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))
              }
            />
          </div>
          <button disabled={updating || updated}>
            {updating ? "Updating.." : "Update password"}
          </button>
        </form>
        {showErr && <div className="error-msg">{err}</div>}
        {updated && (
          <div className="success-msg">
            Password updated successfully. {" "}<Link to="/login">Login</Link> to your account
          </div>
        )}
      </div>
    </div>
  );
}
