import "./Navbar.css";

import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink to='/home'>
        <h1>Write Wave</h1>
        </NavLink>
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to="/home">Home</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
      </ul>
    </nav>
  );
}
