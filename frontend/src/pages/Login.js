import LoginForm from "../components/Login/LoginForm";

export default function Login({setActiveUser}){
    return( <>
        <LoginForm setActiveUser={setActiveUser} />
    </>)
}