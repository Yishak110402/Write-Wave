import LoginForm from "../components/Login/LoginForm";

export default function Login({ setActiveUser }) {
  console.log(setActiveUser);
  return (
    <>
      <LoginForm setActiveUser={setActiveUser} />
    </>
  );
}
