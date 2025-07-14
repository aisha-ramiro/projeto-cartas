import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/Acompanhamento.css';

const Acompanhamento = ({ token: propToken }) => {
  const token = propToken || localStorage.getItem('token');
  const [cartas, setCartas] = useState([]);
  const [erro, setErro] = useState('');
  const [modalCancelamento, setModalCancelamento] = useState({ ativo: false, cartaId: null });

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

  useEffect(() => {
    fetchCartas();
  }, [token]);

  const confirmarCancelamento = (id) => {
    setModalCancelamento({ ativo: true, cartaId: id });
  };

  const cancelarCarta = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/carta/${id}/cancelar`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setModalCancelamento({ ativo: false, cartaId: null });
      fetchCartas();
    } catch (err) {
      console.error('Erro ao cancelar carta:', err);
      alert('Erro ao cancelar carta.');
    }
  };

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
              <p>Data: {new Date(carta.dataCriacao).toLocaleString()}</p>
              <div className="linha-status">
                <span>
                  <strong>Status:</strong>{' '}
                  <span className={`status ${carta.status.toLowerCase().replaceAll(' ', '-')}`}>
                    {carta.status}
                  </span>
                </span>

                {carta.status === 'Cancelado' ? null : carta.status === 'Recebido' ? (
                  <button
                    className="cancel-button active"
                    onClick={() => cancelarCarta(carta._id)}
                  >
                    Cancelar Pedido
                  </button>
                ) : (
                  <div className="tooltip-wrapper">
                    <button className="cancelar-btn disabled" disabled>
                      Cancelar Pedido
                    </button>
                    <span className="tooltip-text">
                      Não é possível cancelar o pedido pois a carta já está em processo de confecção e envio
                    </span>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {modalCancelamento.ativo && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Tem certeza que deseja cancelar?</h3>
            <div className="modal-buttons">
              <button onClick={() => cancelarCarta(modalCancelamento.cartaId)}>Sim</button>
              <button onClick={() => setModalCancelamento({ ativo: false, cartaId: null })}>Não</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Acompanhamento;
