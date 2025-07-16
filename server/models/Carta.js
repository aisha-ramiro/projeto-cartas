// models/Carta.js
const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  destinatario: String,
  texto: String,
  assinatura: String,
  papel: String,
  corEnvelope: String,
  corSelo: String,
  tipoSelo: String,
  status: {
    type: String,
    default: 'Recebido'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  endereco: {
    nomeDestinatario: String,
    cep: String,
    cidade: String,
    estado: String,
    pais: String,
    rua: String,
    numero: String,
    bairro: String
  },
  frete: {
    valor: String,
    prazo: String
  }
});

module.exports = mongoose.model('Carta', cartaSchema);
