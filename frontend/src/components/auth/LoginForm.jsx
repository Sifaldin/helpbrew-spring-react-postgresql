import React, { useState } from 'react';

function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div >
      <div >
        <label htmlFor="email" >
          Email
        </label>
        <input
          id="email1"
          type="text"
          value={email}
          className="input"
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div >
        <label htmlFor="pass" >
          Password
        </label>
        <input
          id="pass2"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-type="password"
          placeholder="Enter your password"
        />
      </div>
      <div >
        <input
          type="submit"
          onClick={() => onSubmit({ email, password })}
          value="Sign In"
        />
      </div>
    </div>
  );
}

export default LoginForm;
