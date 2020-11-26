import React from 'react';
import Auth from '../../services/Auth';
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

  return (
    <div >
      <div >
        <div >
          <div >
            <div >
              <input id="tab-1" type="radio" name="tab"  checked />
              <label htmlFor="tab-1" >
                Login
              </label>
              <input id="tab-2" type="radio" name="tab"  />
              <label htmlFor="tab-2" >
                Sign Up
              </label>
              <div >
                <LoginForm onSubmit={login} />

                <RegisterForm onSubmit={register} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
