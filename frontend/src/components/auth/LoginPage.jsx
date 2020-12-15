import { React, useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from '../../services/Auth';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from "../../assets/logo_transparent_background_small.png";

function LoginPage() {
  const login = async loginData => {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert('Invalid credentials');
    }
  };

  const register = async registrationData => {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  };

  const [isMember, setIsMember] = useState(true);

  const goRegister = () => {
    setIsMember(false);
  }
  const goLogin = () => {
    setIsMember(true);
  }

  return (
    <div className="loginpage">

      <div className="loginGrid">
        <div className="loginpage-text">
          
            <img src={logo} alt="HelpBrew Logo" />
            <h3>With HelpBrew, you can share and receive help with skills, give away stuff,
            receive and give monetary support. HelpBrew gives us all the opportunity to make a
              difference and create a better world. </h3>
       
        </div>
        {isMember ?
          <LoginForm onSubmit={login} goRegister={goRegister} />
          : <RegisterForm onSubmit={register} goLogin={goLogin} />}


        {/*<<input id="tab-1" type="radio" name="tab"  checked />
              <label htmlFor="tab-1" >
                Login
              </label>
              <input id="tab-2" type="radio" name="tab"  />
              <label htmlFor="tab-2" >
                Sign Up
              </label> <div >*/}


      </div>

    </div>

  );
}

export default LoginPage;
