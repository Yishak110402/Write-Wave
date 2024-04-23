import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import Post from "../components/Feed/Post";
import Loader from "./../components/Loader/Loader";

export default function Feed({ activeUser }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(function () {
    if (!activeUser) {
      navigate("/login");
    }
  }, []);

  useEffect(function () {
    async function getAllPosts() {
      const renderURL = "https://writewave-backend-api.onrender.com/posts";
      setLoading(true);
      const res = await fetch(renderURL);
      const data = await res.json();
      setPosts(data.data.posts);
      setLoading(false);
    }
    getAllPosts();
  }, []);

  return (
    <div className="feed">
      <h1>Recent Posts</h1>
      <div className="posts">
        {loading ? (
          <Loader />
        ) : posts.length === 0 ? (
          <div className="no-posts"> Oops!! Looks like the feed is empty</div>
        ) : (
          posts.map((post) => <Post post={post} />)
        )}
      </div>
    </div>
  );
}
