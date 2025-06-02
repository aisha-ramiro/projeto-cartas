// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cartaRoutes = require('./routes/cartaRoute'); 
const authRoutes = require('./routes/authRoutes'); // Importa primeiro

const app = express();
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB!');
  })
  .catch((err) => {
    console.log('Erro ao conectar ao MongoDB:', err);
  });

// Rotas
app.use('/api/auth', authRoutes);   // << precisa estar antes do listen
app.use('/api', cartaRoutes);       // rotas das cartas

// Inicializar servidor
app.listen(5000, () => {
  console.log('Servidor rodando na porta 5000');
});
