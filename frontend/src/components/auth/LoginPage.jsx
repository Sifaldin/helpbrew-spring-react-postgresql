import {React, useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Auth from '../../services/Auth';
import Navbar from '../layout/Navbar';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

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

  const goRegister =() =>{
    setIsMember(false);
  }
  const goLogin =() =>{
    setIsMember(true);
  }

  return (
    <div className="loginpage">
          <div>
            <div>
            <Router>
      <Navbar onLogout={() => Auth.logout()} />
        </Router>
              {/*<<input id="tab-1" type="radio" name="tab"  checked />
              <label htmlFor="tab-1" >
                Login
              </label>
              <input id="tab-2" type="radio" name="tab"  />
              <label htmlFor="tab-2" >
                Sign Up
              </label>
  <div >*/}
                {isMember ? 
              <LoginForm onSubmit={login} goRegister = {goRegister}/> 
              : <RegisterForm onSubmit={register} goLogin = {goLogin}/>}
              </div>
            </div>
          </div>
  );
}

export default LoginPage;
