import SignupForm from "../components/Signup/SignupForm";

export default function Signup({
  activeUser,
  setActiveUser,
  signupFormData,
  setSignupFormData,
}) {
  return (
    <SignupForm
      activeUser={activeUser}
      setActiveUser={setActiveUser}
      setSignupFormData={setSignupFormData}
      signupFormData={signupFormData}
    />
  );
}
