// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cartaRoutes = require('./routes/cartaRoute');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas (versão limpa)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB!');
  })
  .catch((err) => {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  });

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api', cartaRoutes);
app.use('/api/admin', adminRoutes);

// Iniciar servidor
app.listen(5000, () => {
  console.log('🚀 Servidor rodando na porta 5000');
});
