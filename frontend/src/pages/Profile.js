import { useState } from "react";
import UserDescription from "../components/Profile/UserDescription";
import './Profile.css'

export default function Profile({activeUser}){
    return(
        <div className='profile'> 
            <UserDescription activeUser={activeUser}/>
        </div>
    )
}