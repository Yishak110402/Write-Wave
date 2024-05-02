import './PageNotFound.css'
import pagenotfound from './../assets/pagenotfound.png'
import { Link } from 'react-router-dom'

export default function PageNotFound(){
    return(
        <div className='page-not-found'>
            <img src={pagenotfound} />   
            <p>Page not found</p>  
            <Link to='/'>Go back to home</Link>       
        </div>
    )
}