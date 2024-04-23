import { useState } from "react";
import "./MyPost.css";
import { useNavigate } from "react-router-dom";
export default function MyPost({ post, setRerender }) {
  const [deleting, setDeleting] = useState(false)
  const postedTime = new Date(post.createdAt).toLocaleString();
  const edittedTime = new Date(post.lastEditted).toLocaleString();

  const navigate = useNavigate();

  async function handleDeleteBlog() {
    const renderURL =`https://writewave-backend-api.onrender.com/posts/${post._id}`
    setDeleting(true)
    const res = await fetch(renderURL, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setDeleting(false)
    setRerender((r) => !r);
  }

  return (
    <div className="my-post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span>Posted on: {postedTime}</span>
      <span>Editted on: {edittedTime}</span>
      <div className="btns">
        <button disabled={deleting} onClick={() => navigate(`/editblog/${post._id}`)}>
          Edit Blog
        </button>
        <button disabled={deleting} onClick={handleDeleteBlog}>{deleting ? "Deleting..." : "Delete Blog"}</button>
      </div>
    </div>
  );
}
