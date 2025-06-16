// src/pages/AdminPanel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AdminPanel.css'; // Import your CSS styles

const statusOptions = ['Recebido', 'Fazendo', 'Pronto', 'A caminho', 'Cancelado'];
const filterTabs = ['Todos', 'Recebido', 'Fazendo', 'Pronto', 'A caminho', 'Concluído', 'Cancelado'];

const AdminPanel = ({ token }) => {
  const [cartas, setCartas] = useState([]);
  const [message, setMessage] = useState('');
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const fetchCartas = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin/cartas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartas(res.data);
      } catch (err) {
        setMessage('Erro ao carregar cartas.');
      }
    };
    fetchCartas();
  }, [token]);

  const atualizarStatus = async (id, novoStatus) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/admin/carta/${id}/status`,
        { status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartas((prev) =>
        prev.map((carta) =>
          carta._id === id ? { ...carta, status: novoStatus } : carta
        )
      );
    } catch (err) {
      alert('Erro ao atualizar status.');
    }
  };

  const cartasFiltradas = filtro === 'Todos'
    ? cartas
    : cartas.filter((carta) => carta.status === filtro);

  return (
    <div className="admin-panel">
      <h2>Painel Administrativo</h2>
      <div className="filtro-abas">
        {filterTabs.map((tab) => (
          <button
            key={tab}
            className={filtro === tab ? 'aba ativa' : 'aba'}
            onClick={() => setFiltro(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {message && <p className="mensagem-erro">{message}</p>}
      <div className="tabela-cartas">
        {cartasFiltradas.map((carta) => (
          <div key={carta._id} className="carta-card">
            <p><strong>Destinatário:</strong> {carta.destinatario}</p>
            <p><strong>Texto:</strong> {carta.texto}</p>
            <p><strong>Data:</strong> {new Date(carta.createdAt).toLocaleString('pt-BR')}</p>
            <label>Status:
              <select
                value={carta.status}
                onChange={(e) => atualizarStatus(carta._id, e.target.value)}
              >
                {statusOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
