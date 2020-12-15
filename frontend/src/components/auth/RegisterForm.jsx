import React, { useState } from 'react';

function RegisterForm({ onSubmit, goLogin}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signupform">
    <div className="signupBox">
      <div className="signup1">
        <input
          id="user"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Create your Username"
        />
      </div>
      <div className="signup2">
        <input
          id="email2"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div className="signup3">
        <input
          id="pass1"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-type="password"
          placeholder="Create your password"
        />
      </div>
      <div >
        <button
          className="submitButton"
          type="submit"
          onClick={e => onSubmit({ name, email, password })}
          value="Sign Up"
        > SIGN UP</button>
      <div>
        <button 
          className="smallButton"
          onClick={goLogin}
        > Already a Member?</button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default RegisterForm;
