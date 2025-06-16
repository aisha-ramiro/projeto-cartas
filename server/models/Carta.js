const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  destinatario: String,
  texto: String,
  status: {
    type: String,
    enum: ['Em andamento', 'Escrita', 'Selada', 'Enviada'],
    default: 'Em andamento',
  },
  dataCriacao: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // referência ao usuário

}, { timestamps: true });


module.exports = mongoose.model('Carta', cartaSchema);


