import { useState } from "react";
import Comment from "./Comment";
import "./Comments.css";
import NewComment from "./NewComment";
export default function Comments({ post, user, activeUser }) {
  const [rerender, setRerender] = useState(false)
  return (
    <div className="comments">
      <h1>Comments</h1>
      <ul>
        {post.comments &&
          post.comments.map((comment) => (
            <Comment comment={comment} activeUser={activeUser} />
          ))}
      </ul>

      <NewComment setRerender={setRerender} activeUser={activeUser} post={post}/>
    </div>
  );
}
