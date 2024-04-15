import { useNavigate } from "react-router-dom";
import heropic from "./../../assets/heropic.jpg";
import "./Hero.css";

export default function Hero({ activeUser }) {
  const navigate = useNavigate();
  return (
    <div className="hero" style={{ backgroundImage: `url(${heropic})` }}>
      <div className="hero-text">
        <h1>
          Welcome to <span>WriteWave</span>
        </h1>
        <p>Ride the Write Wave: Where Words Crash and Creativity Soars</p>
        <div className="cta-btns">
          {!activeUser ? (
            <>
              <button onClick={() => navigate("/signup")}>
                Create Account
              </button>
              <button onClick={() => navigate("/login")}>Log In</button>
            </>
          ) : (
            <button onClick={()=> navigate('/feed')}>Continue Blogging</button>
          )}
        </div>
      </div>
    </div>
  );
}
