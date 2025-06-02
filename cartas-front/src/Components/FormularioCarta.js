import React, { useState } from 'react';
import axios from 'axios';

const FormularioCarta = ({ token }) => {
  const [destinatario, setDestinatario] = useState('');
  const [texto, setTexto] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!destinatario || !texto) {
      setMessage('Preencha todos os campos.');
      setMessageType('error');
      return;
    }

    try {
      await axios.post(
        'http://localhost:5000/api/carta',
        { destinatario, texto },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('Carta enviada com sucesso!');
      setMessageType('success');
      setDestinatario('');
      setTexto('');
    } catch (err) {
      setMessage('Erro ao enviar carta.');
      setMessageType('error');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Crie sua Carta</h2>
      {message && <p className={`message ${messageType}`}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Destinatário</label>
          <input
            type="text"
            value={destinatario}
            onChange={(e) => setDestinatario(e.target.value)}
            placeholder="Quem vai receber a carta?"
          />
        </div>
        <div className="input-group">
          <label>Texto da Carta</label>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escreva sua carta aqui..."
          />
        </div>
        <button type="submit">Enviar Carta</button>
      </form>
    </div>
  );
};

export default FormularioCarta;
