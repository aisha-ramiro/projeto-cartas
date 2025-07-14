const express = require('express');
const Carta = require('../models/Carta');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Criar nova carta
router.post('/carta', auth, async (req, res) => {
  try {
    const {
      destinatario,
      texto,
      assinatura,
      tipoPapel,
      corEnvelope,
      corSelo,
      tipoSelo
    } = req.body;

    const novaCarta = new Carta({
      destinatario,
      texto,
      assinatura,
      tipoPapel,
      corEnvelope,
      corSelo,
      tipoSelo,
      userId: req.userId
    });

    await novaCarta.save();
    res.status(201).json(novaCarta);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar carta' });
  }
});

// Obter todas as cartas do usuário
router.get('/cartas', auth, async (req, res) => {
  const cartas = await Carta.find({ userId: req.userId });
  res.json(cartas);
});

// Atualizar status de carta (admin ou sistema)
router.put('/carta/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const carta = await Carta.findByIdAndUpdate(id, { status }, { new: true });
  res.json(carta);
});

// ✅ Cancelar carta (usuário só pode cancelar se status for "Recebido")
router.put('/carta/:id/cancelar', auth, async (req, res) => {
  try {
    const carta = await Carta.findById(req.params.id);

    if (!carta) return res.status(404).json({ error: 'Carta não encontrada' });

    // Verifica se a carta pertence ao usuário logado
    if (carta.userId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (carta.status !== 'Recebido') {
      return res.status(400).json({ error: 'Carta não pode ser cancelada nesse status.' });
    }

    carta.status = 'Cancelado';
    await carta.save();

    res.json({ message: 'Carta cancelada com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao cancelar carta.' });
  }
});

module.exports = router;
