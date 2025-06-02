import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin, onSwitch }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, senha });
      onLogin(res.data.token);
    } catch (err) {
      setMessage('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      {message && <p className="message error">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Entrar</button>
      </form>
      <p>Não tem conta? <button onClick={onSwitch}>Cadastre-se</button></p>
    </div>
  );
};

export default Login;