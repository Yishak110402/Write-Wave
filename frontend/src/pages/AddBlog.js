import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import AddBlogForm from "../components/AddBlog/AddBlogForm";

export default function AddBlog({activeUser}){
    const navigate = useNavigate()
    useEffect(function () {
        if (activeUser) {
          navigate("/newblog");
        }
      }, []);
    return(
       <div>
         {activeUser ? <AddBlogForm activeUser={activeUser} /> : <div>Loadingg</div>}
       </div>
    )
}