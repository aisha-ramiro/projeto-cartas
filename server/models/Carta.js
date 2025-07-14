const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  destinatario: String,
  texto: String,
  assinatura: String,
  tipoPapel: String,
  corEnvelope: String,
  corSelo: String,
  tipoSelo: String,
  status: {
    type: String,
    default: 'Recebido'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Carta', cartaSchema);

