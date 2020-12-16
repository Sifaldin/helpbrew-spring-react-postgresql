import { React, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from "../../services/Auth";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import logo from "../../assets/logo-cropped.png";

function LoginPage() {
  const login = async (loginData) => {
    const loginSuccess = await Auth.login(loginData);

    if (loginSuccess) localStorage.setItem("popup", "true");

    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  };

  const register = async (registrationData) => {
    const registerSuccess = await Auth.register(registrationData);
    if (registerSuccess) localStorage.setItem("popup", "true");

    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  };

  const [isMember, setIsMember] = useState(true);

  const goRegister = () => {
    setIsMember(false);
  };
  const goLogin = () => {
    setIsMember(true);
  };

  return (
    <div className="loginpage">
      <div className="login-grid">
        <div className="login-text-box">
          <img src={logo} alt="HelpBrew Logo" />
          <p>
            With HelpBrew, you can share and receive help with skills, give away
            stuff, receive and give monetary support.
          </p>
          {/* HelpBrew gives us all the opportunity to make a difference and create
          a better world! */}
        </div>
        {isMember ? (
          <LoginForm onSubmit={login} goRegister={goRegister} />
        ) : (
          <RegisterForm onSubmit={register} goLogin={goLogin} />
        )}
      </div>
    </div>
  );
}

export default LoginPage;
