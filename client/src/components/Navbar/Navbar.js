import { useState } from "react";
import "./Navbar.css";

import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ activeUser, setActiveUser }) {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(false);

  function handleSignout() {
    localStorage.removeItem("activeUser");
    setActiveUser(null);
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to="/">
          <h1>Write Wave</h1>
        </NavLink>
      </div>
      <ul className="nav-links">
        {!activeUser && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
          </>
        )}
        {activeUser && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/feed">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/newblog">New Blog</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
            <li>
              <button onClick={handleSignout}>Sign Out</button>
            </li>
         
          </>
        )}
      </ul>
      <div
        onClick={() => setOpenDropdown((drop) => !drop)}
        className="dropdown-btn"
      >
        {!openDropdown ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        )}
      </div>
      <ul
        style={{ transform: `translateY(${openDropdown ? "0" : "-150%"})` }}
        className="mobile-nav-links"
        onClick={(e) => setOpenDropdown(false)}
      >
        {!activeUser && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
          </>
        )}
        {activeUser && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/feed">Feed</NavLink>
            </li>
            <li>
              <NavLink to="/newblog">New Blog</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
            <li>
              <button onClick={handleSignout}>Sign Out</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
