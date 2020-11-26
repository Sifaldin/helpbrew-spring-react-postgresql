import React, { useState } from 'react';

function RegisterForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div >
      <div >
        <label htmlFor="user" >
          Username
        </label>
        <input
          id="user"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Create your Username"
        />
      </div>
      <div >
        <label htmlFor="email">
          Email Address
        </label>
        <input
          id="email2"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Enter your email address"
        />
      </div>
      <div >
        <label htmlFor="pass">
          Password
        </label>
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
        <input
          type="submit"
          onClick={e => onSubmit({ name, email, password })}
          value="Sign Up"
        />
      </div>
      <div ></div>
      <div >
        {' '}
        <label htmlFor="tab-1">Already Member?</label>{' '}
      </div>
    </div>
  );
}

export default RegisterForm;
