import Header from "../components/Homepage/Header";

export default function Homepage({activeUser}){
    
    return(
        <div>
            {
                !activeUser ? <h2>Please login to access this page</h2>: (
                    <>
                    <Header activeUser={activeUser}/>
                    </>
                )
            }
        </div>
    )
}