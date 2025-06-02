import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ onRegister, onSwitch }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { nome, email, senha });
      setMessage('Cadastro realizado com sucesso!');
      onRegister();
    } catch (err) {
      setMessage('Erro ao cadastrar. Tente outro email.');
    }
  };

  return (
    <div className="auth-form">
      <h2>Cadastro</h2>
      {message && <p className="message error">{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem conta? <button onClick={onSwitch}>Entrar</button></p>
    </div>
  );
};

export default Register;
