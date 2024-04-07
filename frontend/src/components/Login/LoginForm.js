import { useState } from "react";
import blogImage from "./../../assets/undraw_Blog_post_re_fy5x.png";
import "./LoginForm.css";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({});

  async function handleFormSubmit(e) {
    e.preventDefault();

    const res = await fetch("http://127.0.0.1:6969/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
  }
  return (
    <div className="login">
      <img src={blogImage} />
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Write Wave</h1>
        <input
          onChange={(e) => {
            setFormData((form) => ({ ...form, email: e.target.value }));
          }}
          type="text"
          required
          placeholder="Email"
        />
        <input
          onChange={(e) => {
            setFormData((form) => ({ ...form, password: e.target.value }));
          }}
          type="password"
          required
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p>Don't have an account <Link to='/signup'>sign up</Link> </p>
      </form>
    </div>
  );
}
