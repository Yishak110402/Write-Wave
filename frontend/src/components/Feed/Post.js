import { Link, useParams } from 'react-router-dom';
import './Post.css'

export default function Post({post}) {
  const postedTime = new Date(post.createdAt).toLocaleString();
  const edittedTime = new Date(post.lastEditted).toLocaleString();
 
  return (
    <Link className='post-link' to ={`/feed/${post._id}`} >
    <div className="post">
      <span>{post.creatorName}</span>
      <h3>{post.title}</h3>
      <span>Posted on:- {postedTime}</span>
      <span>Ediited on:- {edittedTime}</span>
    </div>
    </Link>
  );
}
