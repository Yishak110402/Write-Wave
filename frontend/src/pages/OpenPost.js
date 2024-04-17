import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OpenPost.css";
import Loader from "../components/Loader/Loader";

export default function OpenPost() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(function () {
    async function getPostData() {
      setLoading(true);
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/posts/${params.id}`
      );
      const data = await res.json();
      console.log(data);
      setPost(data.data.post);
      setLoading(false);
    }
    getPostData();
  }, []);
  return (
    <div className="open-post">
      {loading ? (
        <Loader />
      ) : (
        <>
          <button onClick={() => navigate("/feed")}>Back to feed</button>
          <h1>Title: {post.title}</h1>
          <p>{post.content}</p>
          <span>Posted by:- {post.creatorName}</span>
        </>
      )}
    </div>
  );
}
