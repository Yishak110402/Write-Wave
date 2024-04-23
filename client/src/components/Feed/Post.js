import { Link, useParams } from 'react-router-dom';
import './Post.css'

export default function Post({post}) {
  const postedTime = new Date(post.createdAt).toLocaleDateString()
  const edittedTime = new Date(post.lastEditted).toLocaleDateString();
  let postTitle = ''
  if(post.title.length>25){
      postTitle = `${post.title.slice(0,20)}...`
  }else{
    postTitle= post.title
  }
 
  return (
    <Link className='post-link' to ={`/feed/${post._id}`} >
    <div className="post">
      <span className=''>{post.creatorName}</span>
      <h3>{postTitle}</h3>
      <span>Posted on:- {postedTime}</span>
      <span>Ediited on:- {edittedTime}</span>
    </div>
    </Link>
  );
}
