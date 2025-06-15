import React, { useState, useEffect } from 'react';
import axios from 'axios';

import '../Styles/Acompanhamento.css'

const Acompanhamento = ({ token: propToken }) => {
  const token = propToken || localStorage.getItem('token');
  
  const [cartas, setCartas] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cartas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartas(response.data);
      } catch (err) {
        setErro('Erro ao buscar cartas');
        console.error(err);
      }
    };

    fetchCartas();
  }, [token]);

  return (
    <div className="status-container">
      <h2>Acompanhamento de Cartas</h2>
      {erro && <p className="message error">{erro}</p>}
      {cartas.length === 0 ? (
        <p>Você ainda não enviou nenhuma carta.</p>
      ) : (
        <ul>
          {cartas.map((carta) => (
            <li key={carta._id}>
              <h3>Destinatário: {carta.destinatario}</h3>
              <p>Status: {carta.status}</p>
              <p>Data: {new Date(carta.dataCriacao).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Acompanhamento;
