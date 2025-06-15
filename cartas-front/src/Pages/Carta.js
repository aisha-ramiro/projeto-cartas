import React from 'react';
import FormularioCarta from '../Components/FormularioCarta';

const Carta = ({ token }) => {
  return (
    <div>
      <FormularioCarta token={token} />
    </div>
  );
};

export default Carta;