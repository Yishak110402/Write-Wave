import { useState } from "react";
import {useNavigate} from "react-router-dom"
import "./AddBlogForm.css";

export default function AddBlogForm({ activeUser }) {
  const [adding, setAdding] = useState(false)
  const [formData, setFormData] = useState({
    createdBy: activeUser._id,
    creatorName: activeUser.name,
  });

  const navigate = useNavigate()

  async function handleFormSubmit(e) {
    setAdding(true)
    e.preventDefault();
    const renderURL = "https://writewave-backend-api.onrender.com/posts"
    const res = await fetch(renderURL , {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data);
    navigate('/feed')
    setAdding(false)
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
      <button disabled={adding} className="add-btn" type="submit">
        {adding ? "Adding..." : "Add Blog"}
      </button>
    </form>
  );
}
