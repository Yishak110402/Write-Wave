import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Feed.css";
import Post from "../components/Feed/Post";

export default function Feed({ activeUser }) {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  useEffect(function(){
      if(!activeUser){
          navigate('/login')

      }
  },[])

  useEffect(function () {
    async function getAllPosts() {
      const res = await fetch("http://127.0.0.1:6969/posts");
      const data = await res.json();
      console.log(data);
      setPosts(data.data.posts);
    }
    getAllPosts();
  }, []);

  return (
    <div className="feed">
      <h1>Recent Posts</h1>
      <div className="posts">
        {posts.length === 0 ? (
          <div className="no-posts"> Oops!! Looks like the feed is empty</div>
        ) : (
          posts.map((post) => <Post post={post} />)
        )}
      </div>
    </div>
  );
}
