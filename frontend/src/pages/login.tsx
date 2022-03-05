import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Button from "../components/button";
import InputLabeled from "../components/inputLabeled";
import { setToken } from "../utils/token";
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const nav = useNavigate();

  function loginUser() {
    api.login.login({ email, password: pwd })
      .then(x => setToken(x.token))
      .then(() => { nav('/'); })
      .catch(x => alert(x.message));
  }

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
      <Button color="primary" text="Entrar" onClick={loginUser} />
    </div>
  )
}

export default Login