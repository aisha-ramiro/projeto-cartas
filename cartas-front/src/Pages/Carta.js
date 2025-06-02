import React from 'react';
import FormularioCarta from '../Components/FormularioCarta';

const Carta = ({ token }) => {
  return (
    <div>
      <h2>Nova Carta</h2>
      <FormularioCarta token={token} />
    </div>
  );
};

export default Carta;