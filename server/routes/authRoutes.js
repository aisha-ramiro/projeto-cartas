// routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = process.env.JWT_SECRET;

// Cadastro
router.post('/register', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const user = new User({ nome, email, senha });
    await user.save();
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(400).json({ error: 'Erro ao registrar usuário', details: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(senha))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '2h' });

  res.json({ token, nome: user.nome });
});

module.exports = router;
