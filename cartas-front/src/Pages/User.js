// src/pages/Usuario.js
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ConfiguracoesConta from '../Components/ConfiguracoesConta';
import Endereco from '../Components/Endereco';
import Pagamento from '../Components/Pagamento';
import '../Styles/User.css';


const User = ({ token }) => {


  return (
    <div className="usuario-container">
      <nav className="usuario-menu">
        <Link to="/usuario/cartas">Meus Pedidos</Link>
        </nav>
      <div className="usuario-conteudo">
      </div>
    </div>
  );
};

export default User;
// src/Components/ConfiguracoesConta.js