import { useEffect, useState } from "react";

export default function Comment({ comment, activeUser }) {
  const [user, setUser] = useState();
  const [showOptions, setShowOptions] = useState(false);
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
  return (
    <div className="comment">
      {user && (
        <>
          <div>
            <img
              src={`https://writewave-backend-api.onrender.com/profiles/${user.profilePicture}`}
            />
            <h2>{user.name}</h2>
          </div>
          <div className="comment-content">
            <h2>{comment.commentContent}</h2>
            {activeUser._id === comment.commentor && (
              <div className="options-container">
                <span onClick={()=>(setShowOptions((options)=>(!options)))}>...</span>
                {showOptions && (
                  <ul>
                    <li>Delete</li>
                    <li>Edit</li>
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
