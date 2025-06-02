import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Acompanhamento from '../Components/Acompanhamento';

const Usuario = ({ token }) => {
  return (
    <div>
      <nav>
        <Link to="/usuario/cartas">Ver Cartas</Link>
      </nav>
      <Routes>
        <Route path="cartas" element={<Acompanhamento token={token} />} />
      </Routes>
    </div>
  );
};

export default Usuario;
