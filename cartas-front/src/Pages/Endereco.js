// src/Pages/Endereco.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Endereco.css';

const Endereco = ({ token: propToken }) => {
  const token = propToken || localStorage.getItem('token');
  const navigate = useNavigate();

  const [carta, setCarta] = useState({});
  const [endereco, setEndereco] = useState({
    nomeDestinatario: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    pais: '',
  });

  // Recupera os dados da carta do localStorage ao carregar a página
  useEffect(() => {
    const cartaSalva = JSON.parse(localStorage.getItem('carta'));
    if (cartaSalva) {
      setCarta(cartaSalva);
    } else {
      alert('Erro: dados da carta não encontrados.');
      navigate('/usuario');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dadosCompletos = {
        ...carta,
        endereco
      };

      await axios.post('http://localhost:5000/api/carta', dadosCompletos, {
        headers: { Authorization: `Bearer ${token}` }
      });

      localStorage.removeItem('carta');
      navigate('/usuario', { state: { sucesso: true } });
    } catch (error) {
      console.error('Erro ao enviar a carta:', error);
      alert('Erro ao enviar a carta. Tente novamente.');
    }
  };

  return (
    <div className="endereco-container">
      <h2>Endereço do Destinatário</h2>
      <form className="endereco-form" onSubmit={handleSubmit}>
        <input required type="text" name="nomeDestinatario" placeholder="Nome completo" onChange={handleChange} />
        <input required type="text" name="rua" placeholder="Rua / Logradouro" onChange={handleChange} />
        <input required type="text" name="numero" placeholder="Número" onChange={handleChange} />
        <input type="text" name="complemento" placeholder="Complemento" onChange={handleChange} />
        <input required type="text" name="bairro" placeholder="Bairro" onChange={handleChange} />
        <input required type="text" name="cidade" placeholder="Cidade" onChange={handleChange} />
        <input required type="text" name="estado" placeholder="Estado" onChange={handleChange} />
        <input required type="text" name="cep" placeholder="CEP" onChange={handleChange} />
        <input required type="text" name="pais" placeholder="País" onChange={handleChange} />
        <button type="submit">Enviar Carta</button>
      </form>
    </div>
  );
};

export default Endereco;
