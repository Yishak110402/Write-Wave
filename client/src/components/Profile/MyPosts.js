import { useEffect, useState } from "react";
import MyPost from "./MyPost";
import "./MyPosts.css";
import Loader from "../Loader/Loader";

export default function MyPosts({ activeUser }) {
  const [myPosts, setMyposts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rerender, setRerender] = useState(false);
  useEffect(
    function () {
      async function getUserPosts() {
        setLoading(true);
        const renderURL = `https://writewave-backend-api.onrender.com/users/posts/${activeUser._id}`
        const res = await fetch(`http://127.0.0.1:6969/users/posts/${activeUser._id}`);
        const data = await res.json();
        console.log(data);
        setMyposts(data.data.posts);
        setLoading(false);
      }
      getUserPosts();
    },
    [rerender]
  );

  return (
    <div className="my-posts">
      {loading && myPosts !== null ? (
        <Loader />
      ) : myPosts.length === 0 ? (
        <div className="empty-posts">You have no posts</div>
      ) : (
        myPosts.map((post) => <MyPost post={post} setRerender={setRerender} />)
      )}
    </div>
  );
}
