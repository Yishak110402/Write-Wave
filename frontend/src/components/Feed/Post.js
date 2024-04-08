import { Link, useParams } from 'react-router-dom';
import './Post.css'

export default function Post({post}) {
 
  return (
    <Link className='post-link' to ={`/home/${post._id}`} >
    <div className="post">
      <span>User: {post.creatorName}</span>
      <h3>{post.title}</h3>
    </div>
    </Link>
  );
}
