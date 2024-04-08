import { useEffect, useState } from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import './OpenPost.css'

export default function OpenPost(){
    const [post, setPost] = useState({})
    const x = useParams()
    console.log(x);
    const navigate = useNavigate()
    useEffect(function(){
        async function getPostData(){
            const res = await fetch(`http://127.0.0.1:6969/posts/${x.id}`)
            const data = await res.json()
            console.log(data);
            setPost(data.data.post)
        }
        getPostData()
    },[])
    return(
        <div className='open-post'>
            <button onClick={()=>(navigate('/home'))} >Back to feed</button>
           <h1>Title: {post.title}</h1>
           <p>{post.content}</p>
           <span>Posted by:- {post.creatorName}</span>
     </div>
    )
}