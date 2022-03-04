import React, { useState } from "react";
import Button from "../components/button";
import InputLabeled from "../components/inputLabeled";
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  return (
    <div className="login-container">
      <InputLabeled
        id="login-email"
        label="Email"
        type="email"
        onChange={setEmail}
        value={email}
      />
      <InputLabeled
        id="login-pwd"
        label="Password"
        type="password"
        onChange={setPwd}
        value={pwd}
      />
      <Button color="primary" text="Entrar" onClick={() => alert('clicado')} />
    </div>
  )
}

export default Login