import React, { useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="sign-up-form">
      <div className="group">
        <label htmlFor="user" className="label">
          Username
        </label>
        <input
          id="user"
          type="text"
          className="input"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Create your Username"
        />
      </div>
      <div className="group">
        <label htmlFor="email" className="label">
          Email Address
        </label>
        <input
          id="email2"
          type="text"
          className="input"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div className="group">
        <label htmlFor="pass" className="label">
          Password
        </label>
        <input
          id="pass1"
          type="password"
          className="input"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-type="password"
          placeholder="Create your password"
        />
      </div>
      <div className="group">
        <input
          type="submit"
          className="button"
          onClick={e => onSubmit({ name, email, password })}
          value="Sign Up"
        />
      </div>
      <div className="hr"></div>
      <div className="foot">
        {' '}
        <label htmlFor="tab-1">Already Member?</label>{' '}
      </div>
    </div>
  );
}

export default RegisterForm;
