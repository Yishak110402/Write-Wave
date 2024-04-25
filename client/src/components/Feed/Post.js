import { Link, useParams } from "react-router-dom";
import "./Post.css";
import { useEffect, useState } from "react";

export default function Post({ post, allUsers }) {
  const [postedUser, setPostedUser] = useState({});
  const postedTime = new Date(post.createdAt).toLocaleDateString();
  const edittedTime = new Date(post.lastEditted).toLocaleDateString();
  // console.log(allUsers.filter((user)=>(user._id === post.createdBy))[0]);
  useEffect(function () {
    setPostedUser(allUsers.filter((user) => user._id === post.createdBy)[0]);
  }, []);

  let postTitle = "";
  if (post.title.length > 25) {
    postTitle = `${post.title.slice(0, 20)}...`;
  } else {
    postTitle = post.title;
  }

  return (
    <Link className="post-link" to={`/feed/${post._id}`}>
      <div className="post">
        <span className="">
          {postedUser ? postedUser.name : post.creatorName}
        </span>
        <h3>{postTitle}</h3>
        <span>Posted on:- {postedTime}</span>
        <span>Ediited on:- {edittedTime}</span>
      </div>
    </Link>
  );
}
