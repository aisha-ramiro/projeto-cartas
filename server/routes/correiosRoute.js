const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/calcular-frete-correios', async (req, res) => {
  const {
    cepDestino,
    cepOrigem = '15910000', // fixo ou dinâmico
    peso = 0.3,
    comprimento = 20,
    altura = 5,
    largura = 15
  } = req.body;

  try {
    const response = await axios.post('http://ws.correios.digitalone.com.br/', {
      cepDestino,
      cepOrigem,
      peso,
      comprimento,
      altura,
      largura
    });

    return res.json(response.data);
  } catch (error) {
    console.error('Erro ao calcular frete via Correios DigitalOne:', error.message);
    return res.status(500).json({ error: 'Erro ao calcular frete' });
  }
});

module.exports = router;
