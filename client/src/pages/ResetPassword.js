import { useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import resetPasswordImg from "./../assets/forgotpassword.png";
import { useEffect } from "react";

export default function ResetPassword({ verifiedEmail }) {
    useEffect(function(){
        if(!verifiedEmail){
            navigate('/login')
        }
    },[])

    const navigate = useNavigate()
  return (
    <div className="reset-password">
      <img src={resetPasswordImg} />

      <div className="reset-form">
        <h1>Reset Password for {verifiedEmail}</h1>
        <form>
            <div>
            <p>Enter new password</p>
            <input type="text" />
            </div>
            <div>
            <p>Confirm new password</p>
            <input type="text" />
            </div>
            <button>Update password</button>
        </form>
      </div>
    </div>
  );
}
