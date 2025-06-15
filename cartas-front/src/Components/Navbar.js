
// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Navbar.css'
import { FiLogOut } from 'react-icons/fi';
import logoNav from '../assets/logo-pluma-claro-text.png';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    if (onLogout) onLogout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/"><img src={logoNav} alt="Logo Cartas Vintage" /></Link>
        
      </div>
      <ul className="navbar-links">
        <li><Link to="/nova-carta">Nova Carta</Link></li>
        <li><Link to="/usuario/cartas">Minhas Cartas</Link></li>
        <li><Link to="/user">Minha Conta</Link></li>
          <button className="logout-button" onClick={handleLogout} title="Sair">
        <FiLogOut size={20} />
      </button>
      </ul>
    
    </nav>
  );
};

export default Navbar;