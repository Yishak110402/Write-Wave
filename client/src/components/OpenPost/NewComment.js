import { useState } from "react";

export default function NewComment({ setRerender, activeUser,post }) {
  const [comment, setComment] = useState({});
    async function addComment(){
        const res = await fetch(`https://writewave-backend-api.onrender.com/comment/${post._id}`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(comment)
        })
        const data = await res.json()
        console.log(data);
    }

  return (
    <div>
      <input
        onChange={(e) =>
          setComment((comment) => ({
            ...comment,
            commentContent: e.target.value,
            commentor: activeUser._id
          }))
        }
        type="text"
      />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}
