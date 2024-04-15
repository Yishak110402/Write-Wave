import "./Navbar.css";

import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ activeUser , setActiveUser}) {
  const navigate = useNavigate()

  function handleSignout(){
    localStorage.removeItem('activeUser')
    setActiveUser(null)
    navigate('/login')
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
            <NavLink to='/'>Home</NavLink>
          </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log in</NavLink>
            </li>
          </>
        )}
        {
          activeUser && (
            <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to='/feed' >Feed</NavLink>
            </li>
            <li>
              <NavLink to="/newblog">New Blog</NavLink>
            </li>
            <li>
              <NavLink to="/profile">My Profile</NavLink>
            </li>
            <li>
             <button onClick={handleSignout} >Sign Out</button>
            </li>
            </>
          )
        }
      </ul>
    </nav>
  );
}
