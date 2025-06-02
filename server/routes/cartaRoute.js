const express = require('express');
const Carta = require('../models/Carta');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

// Rota para criar uma nova carta
router.post('/carta', auth, async (req, res) => {
  const { destinatario, texto } = req.body;
  const carta = new Carta({ destinatario, texto, userId: req.userId });
  await carta.save();
  res.status(201).json(carta);
});

// Rota para obter o status das cartas
router.get('/cartas', auth, async (req, res) => {
  const cartas = await Carta.find({ userId: req.userId });
  res.json(cartas);
});

// Rota para atualizar o status da carta
router.put('/carta/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const carta = await Carta.findByIdAndUpdate(id, { status }, { new: true });
  res.json(carta);
});

module.exports = router;