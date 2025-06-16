const express = require('express');
const router = express.Router();
const Carta = require('../models/Carta');
const verifyToken = require('../middleware/authMiddleware');
const verifyAdmin = require('../middleware/verifyAdmin');


// Rota para listar todas as cartas
router.get('/cartas', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const cartas = await Carta.find().sort({ createdAt: -1 });
    res.json(cartas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar cartas' });
  }
});

// Atualizar status
router.patch('/carta/:id/status', verifyToken, async (req, res) => {
  try {
    const carta = await Carta.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(carta);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

module.exports = router;
