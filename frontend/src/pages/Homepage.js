export default function Homepage({activeUser}){
    
    return(
        <div>
            {
                !activeUser ? <h2>Please login to access this page</h2>: <p>Youre logged in successfully</p>
            }
        </div>
    )
}