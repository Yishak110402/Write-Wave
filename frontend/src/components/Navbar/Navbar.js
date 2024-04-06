import { NavLink } from "react-router-dom";

export default function Navbar(){
    return (
        <nav>
            <div>
                <h1>Write Wave</h1>
            </div>
            <ul>
                <li>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/login'>Log in</NavLink>
                </li>
            </ul>
        </nav>
    )
}