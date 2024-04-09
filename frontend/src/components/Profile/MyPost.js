import "./MyPost.css";
import { useNavigate } from "react-router-dom";
export default function MyPost({ post, setRerender }) {
  const postedTime = new Date(post.createdAt).toLocaleString();
  const edittedTime = new Date(post.lastEditted).toLocaleString();

  const navigate = useNavigate();

  async function handleDeleteBlog() {
    const res = await fetch(`http://127.0.0.1:6969/posts/${post._id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    setRerender((r) => !r);
  }

  return (
    <div className="my-post">
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <span>Posted on: {postedTime}</span>
      <span>Editted on: {edittedTime}</span>
      <div className="btns">
        <button onClick={() => navigate(`/editblog/${post._id}`)}>
          Edit Blog
        </button>
        <button onClick={handleDeleteBlog}>Delete Blog</button>
      </div>
    </div>
  );
}
