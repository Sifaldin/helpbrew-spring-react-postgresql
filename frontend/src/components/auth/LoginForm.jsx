import React, { useState } from 'react';

function LoginForm({ onSubmit, goRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div >
      <div className="signinform">
      <div className="signin-1">
        <input
          id="email1"
          type="text"
          value={email}
          className="input"
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div className="signin2">
        <input
          id="pass2"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-type="password"
          placeholder="Enter your password"
        />
      </div>
      <div>

        <button 
        className="smallButton"
        onClick = {()=>alert("Think hard!")}>
          Forget password
        </button>

        <button 
        className="gotoRegister"
        onClick = {goRegister}>
          Not a member
        </button>
      </div>
      <div className="signin3">
        <button 
          className="submitButton"
          type="submit"
          onClick={() => onSubmit({ email, password })}
          value="Sign In">
          SIGN IN
          </button>
        
      </div>
      </div>
    </div>
    
  );
}

export default LoginForm;
