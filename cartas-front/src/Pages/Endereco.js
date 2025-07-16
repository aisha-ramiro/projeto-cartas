import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Styles/Endereco.css';

const Endereco = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  console.log('Token:', token);

  const carta = JSON.parse(localStorage.getItem('dadosCarta'));

  const [endereco, setEndereco] = useState({
    nomeDestinatario: '',
    cep: '',
    cidade: '',
    estado: '',
    pais: '',
    rua: '',
    numero: '',
    bairro: '',
  });

  const [frete, setFrete] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEndereco((prev) => ({ ...prev, [name]: value }));

    if (name === 'cep' && value.length === 8) {
      buscarCep(value);
      calcularFrete(value);
    }
  };

  const buscarCep = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      setEndereco((prev) => ({
        ...prev,
        cidade: data.localidade || '',
        estado: data.uf || '',
        pais: 'Brasil',
        bairro: data.bairro || '',
        rua: data.logradouro || ''
      }));
    } catch (err) {
      console.error('Erro ao buscar CEP:', err);
    }
  };

const calcularFrete = async (cepDestino) => {
  alert("calculando frete...");

  try {
    const response = await axios.post("http://localhost:5000/api/calcular-frete", {
      cepDestino,
    });

    alert("Resposta recebida do backend!");
    console.log("Resposta do frete:", response.data);

    setFrete(response.data);
  } catch (err) {
    alert("Erro ao calcular frete!");
    console.error("Erro ao calcular frete:", err);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/carta',
        {
          ...carta,
          endereco,
          frete
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem('dadosCarta');
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
        <input required type="text" name="nomeDestinatario" placeholder="Nome completo" value={endereco.nomeDestinatario} onChange={handleChange} />
        <input required type="text" name="cep" placeholder="CEP" value={endereco.cep} onChange={handleChange} />
        <input required type="text" name="cidade" placeholder="Cidade" value={endereco.cidade} readOnly />
        <input required type="text" name="estado" placeholder="Estado" value={endereco.estado} readOnly />
        <input required type="text" name="pais" placeholder="País" value={endereco.pais} readOnly />
        <input required type="text" name="rua" placeholder="Rua / Logradouro" value={endereco.rua} onChange={handleChange} />
        <input required type="text" name="numero" placeholder="Número" value={endereco.numero} onChange={handleChange} />
        <input required type="text" name="bairro" placeholder="Bairro" value={endereco.bairro} onChange={handleChange} />

        {frete && (
          <div className="frete-info">
            <p><strong>Frete estimado:</strong> R$ {frete.valor}</p>
            <p><strong>Prazo de entrega:</strong> {frete.prazo} dias úteis</p>
          </div>
        )}

        <button type="submit">Enviar Carta</button>
      </form>
    </div>
  );
};

export default Endereco;
