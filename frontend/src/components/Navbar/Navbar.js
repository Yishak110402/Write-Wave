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
        <NavLink to="/home">
          <h1>Write Wave</h1>
        </NavLink>
      </div>
      <ul className="nav-links">
        {!activeUser && (
          <>
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
              <NavLink to="/home">Home</NavLink>
            </li>
            {/* <li>
              <NavLink to="/posts">My Posts</NavLink>
            </li> */}
            <li>
              <NavLink to="/newblog">New Blog</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search for Users</NavLink>
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
