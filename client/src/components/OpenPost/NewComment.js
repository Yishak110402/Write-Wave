import { useState } from "react";

export default function NewComment({ setRerender, activeUser,post }) {
  const [comment, setComment] = useState({});
  const [adding, setAdding] = useState(false)
    async function addComment(){
        setAdding(true)
        const res = await fetch(`https://writewave-backend-api.onrender.com/posts/comment/${post._id}`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(comment)
        })
        const data = await res.json()
        console.log(data);
        setRerender((r)=>(!r))
        setComment((comment)=>({...comment, commentContent:""}))
        setAdding(false)
    }

  return (
    <div className="new-comment"> 
      <textarea
        onChange={(e) =>
          setComment((comment) => ({
            ...comment,
            commentContent: e.target.value,
            commentor: activeUser._id
          }))
          
        }
        value={comment.commentContent}
        disabled={adding}
      />
      <button onClick={addComment} disabled={adding} >Add Comment</button>
    </div>
  );
}
