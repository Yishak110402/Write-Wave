import LoginForm from "../components/Login/LoginForm";

export default function Login({activeUser, setActiveUser }) {
  return (
    <>
      <LoginForm activeUser={activeUser} setActiveUser={setActiveUser} />
    </>
  );
}
