import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/FormularioCarta.css'; // Import your CSS styles

const FormularioCarta = ({ token }) => {
  const [destinatario, setDestinatario] = useState('');
  const [texto, setTexto] = useState('');
  const [assinatura, setAssinatura] = useState('');
  const [papel, setPapel] = useState('Normal');
  const [corEnvelope, setCorEnvelope] = useState('Bege');
  const [corSelo, setCorSelo] = useState('Marrom');
  const [tipoSelo, setTipoSelo] = useState('Rosa');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        'http://localhost:5000/api/carta',
        {
          destinatario,
          texto,
          assinatura,
          papel,
          corEnvelope,
          corSelo,
          tipoSelo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setMessage('Carta enviada com sucesso!');
      setDestinatario('');
      setTexto('');
      setAssinatura('');
    } catch (error) {
      setMessage('Erro ao enviar a carta.');
    }
  };

  return (
    <div className="formulario-container">
      <h2>Nova Carta</h2>
      {message && <p className="form-message">{message}</p>}

      <form onSubmit={handleSubmit} className="formulario-flex">
        {/* BLOCO 1 - TEXTO */}
        <div className="form-bloco">
          <label>Nome do Destinatário</label>
          <input required placeholder="Quem vai receber a carta? Nome ou apelido" type="text" value={destinatario} onChange={(e) => setDestinatario(e.target.value)} />

          <label>Texto da Carta</label>
          <textarea required value={texto} onChange={(e) => setTexto(e.target.value)} />

          <label>Assinatura</label>
          <input required placeholder='Seu nome' type="text" value={assinatura} onChange={(e) => setAssinatura(e.target.value)} />
        </div>

        {/* BLOCO 2 - ESTILO */}
        <div className="form-bloco">
          <div>
                <label>Tipo de Papel</label>
          <select value={papel} onChange={(e) => setPapel(e.target.value)}>
            <option>Normal</option>
            <option>Envelhecido</option>
          </select>

          <label>Cor do Envelope</label>
          <select value={corEnvelope} onChange={(e) => setCorEnvelope(e.target.value)}>
            <option>Bege</option>
            <option>Marrom</option>
            <option>Vermelho</option>
            <option>Verde</option>
          </select>

          <label>Cor do Selo</label>
          <select value={corSelo} onChange={(e) => setCorSelo(e.target.value)}>
            <option>Marrom</option>
            <option>Vermelho</option>
            <option>Verde</option>
            <option>Azul</option>
            <option>Branco</option>
          </select>

          <label>Tipo de Selo</label>
          <select value={tipoSelo} onChange={(e) => setTipoSelo(e.target.value)}>
            <option>Rosa</option>
            <option>Galhos</option>
            <option>Pena e tinta</option>
          </select>
          </div>

          <div className='botao' >
            <button type="submit">Continuar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormularioCarta;
