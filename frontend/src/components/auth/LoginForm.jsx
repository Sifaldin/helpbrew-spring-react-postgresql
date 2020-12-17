import React, { useState } from "react";

function LoginForm({ onSubmit, goRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="form-wrapper">
      <div className="signinform">
        
        <input
          id="email1"
          type="text"
          value={email}
          className="input"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
       
        <input
          id="pass2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-type="password"
          placeholder="Enter your password"
        />
       
        <button
          className="submitButton"
          type="submit"
          onClick={() => onSubmit({ email, password })}
          value="Sign In"
        >
          SIGN IN
        </button>

       

        <div className="login-options">
          <button className="smallButton" onClick={() => alert("Think hard!")}>
            Forgot password?
          </button>
          <button className="gotoRegister" onClick={goRegister}>
            Not a member?
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
