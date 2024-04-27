import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OpenPost.css";
import Loader from "../components/Loader/Loader";

export default function OpenPost() {
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  useEffect(function () {
    async function getPostData() {
      setLoading(true);
      const renderURL = `https://writewave-backend-api.onrender.com/posts/${params.id}`;
      const res = await fetch(renderURL);
      const data = await res.json();
      console.log(data);
      setPost(data.data.post);
      setUser(data.data.user);
      // console.log(data.data.user.profilePicture);
      if(data.data.user === null){
        setUser((user)=>({...user, profilePicture:"default.jpg"}))
      }
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
          <span>
            Posted by:- {user ? user.name : post.creatorName}
              <img
                className="user-profile-pic"
                src={`https://writewave-backend-api.onrender.com/profiles/${user.profilePicture}`}
              />
          </span>
        </>
      )}
    </div>
  );
}
