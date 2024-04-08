import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./AddBlogForm.css";

export default function AddBlogForm({ activeUser }) {
  const [formData, setFormData] = useState({
    createdBy: activeUser._id,
    creatorName: activeUser.name,
  });

  const navigate = useNavigate()

  async function handleFormSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:6969/posts", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    navigate('/home')
  }

  return (
    <form onSubmit={(e) => handleFormSubmit(e)} className="addblog-form">
      <h1>Add new blog</h1>
      <div className="title">
        <label>Blog title</label>
        <input
          required
          type="text"
          onChange={(e) =>
            setFormData((form) => ({ ...form, title: e.target.value }))
          }
        />
      </div>
      <div className="content">
        <label>Blog Content</label>
        <textarea
          onChange={(e) =>
            setFormData((form) => ({ ...form, content: e.target.value }))
          }
          required
        />
      </div>
      <button className="add-btn" type="submit">
        Add Blog
      </button>
    </form>
  );
}
