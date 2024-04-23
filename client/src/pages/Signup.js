import SignupForm from "../components/Signup/SignupForm";

export default function Signup({activeUser, setActiveUser}){
    return (
        <SignupForm activeUser={activeUser} setActiveUser={setActiveUser} />
    )
}