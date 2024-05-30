import LoginForm from "../../components/LoginForm/LoginForm";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePW = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignUp = () => {
    setShowSignUp(true);
  };

  const navigateToDash = () => {
    navigate("/dashboard");
  };
  return (
    <>
      {!showSignUp ? (
        <LoginForm
          setUser={setUser}
          onSignUp={navigateToSignUp}
          showPassword={showPassword}
          togglePW={togglePW}
        />
      ) : (
        <SignUpForm
          setUser={setUser}
          navigateToDash={navigateToDash}
          showPassword={showPassword}
          togglePW={togglePW}
        />
      )}
    </>
  );
}
