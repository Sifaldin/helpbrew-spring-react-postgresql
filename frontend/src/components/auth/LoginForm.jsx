import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
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
      <div className="signin3">
        <button type="submit"
          onClick={() => onSubmit({ email, password })}
          value="Sign In">
          SIGN IN
          </button>
        
      </div>
      <h5>Not a member? </h5>
      </div>
    </div>
    
  );
}

export default LoginForm;
