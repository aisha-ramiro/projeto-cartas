const express = require('express');
const router = express.Router();

router.post('/calcular-frete', async (req, res) => {
  const { cepDestino } = req.body;

  // Exemplo de resposta simulada
  const frete = {
    valor: '15.90',
    prazo: '5'
  };

  return res.json(frete);
});

module.exports = router;
