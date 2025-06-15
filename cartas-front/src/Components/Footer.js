// src/components/Footer.js
import React from 'react';
import '../Styles/Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Cartas Vintage. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;