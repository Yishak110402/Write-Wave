import { useEffect, useState } from "react";

export default function Comment({ comment, activeUser, post, setRerender }) {
  const [user, setUser] = useState();
  const [showOptions, setShowOptions] = useState(false);
  const [canDelete, setCanDelete] = useState(activeUser._id == post.createdBy || comment.commentor == activeUser._id )
  useEffect(function () {
    async function getUser() {
      const res = await fetch(
        `https://writewave-backend-api.onrender.com/users/${comment.commentor}`
      );
      const data = await res.json();
      console.log(data);
      if (data.status === "success") {
        setUser(data.data.user);
      }
      if (data.status === "fail") {
        setUser(() => ({
          name: "Deleted Account",
          profilePicture: "default.jpg",
        }));
      }
    }
    getUser();
  }, []);
  async function deleteComment() {
    const res = await fetch(
      `https://writewave-backend-api.onrender.com/posts/${post._id}/${comment._id}`,
      {
        method: "DELETE",
      }
    );
    const data = await res.json();
    console.log(data);
    setShowOptions(false)
    setRerender((r)=>(!r))
  }
  return (
    <div className="comment">
      {user && (
        <>
          <div className="user-detail">
            <img
              src={`https://writewave-backend-api.onrender.com/profiles/${user.profilePicture}`}
            />
            <h2>{user.name}</h2>
          </div>
          <div className="comment-content">
            <p>{comment.commentContent}</p>
            {activeUser._id === comment.commentor && (
              <div className="options-container">
                <span onClick={() => setShowOptions((options) => !options)}>
                  ...
                </span>
                {showOptions && (
                  <ul>
                    <li onClick={deleteComment}>Delete</li>
                  </ul>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
