import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"

export default function EditBlog(){
    const [formData, setFormData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(function(){
        async function getPost(){
            setLoading(true)
            const res = await fetch(`http://127.0.0.1:6969/posts/${params.id}`)
            const data = await res.json()
            console.log(data);
            setFormData((form)=>({...form, content: data.data.post.content, title: data.data.post.title}))
            setLoading(false)
        }
        getPost()
    },[])
    const params = useParams()
    const navigate = useNavigate()
    console.log(params);

    async function handleFormSubmit(e){
        e.preventDefault()
        const res = await fetch(`http://127.0.0.1:6969/posts/${params.id}`,{
            method:"PATCH",
            headers:{
                "Content-type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        const data =await res.json()
        console.log(data);
        navigate('/profile')
    }

    return(
      <>
      {
        loading?<div>Loading...</div>:(
            <form className="addblog-form" onSubmit={(e)=> handleFormSubmit(e)} >
            <h1>Edit blog</h1>
            <button onClick={()=>(navigate(-1))} >Back to profile</button>
            <div className="title">
              <label>Blog title</label>
              <input
                required
                type="text"
                onChange={(e)=>(setFormData((form)=>({...form,title:e.target.value})))}  
                value={formData.title}         
              />
            </div>
            <div className="content">
              <label>Blog Content</label>
              <textarea
                onChange={(e)=>(setFormData((form)=>({...form,content:e.target.value})))}  
                value={formData.content}               
                required
              />
            </div>
            <button className="add-btn" type="submit">
              Edit Blog
            </button>
          </form>
        )
      }
      </>
    )
}