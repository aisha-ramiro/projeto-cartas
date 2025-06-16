const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
    }
    next();
  } catch (err) {
    res.status(500).json({ error: 'Erro ao verificar administrador' });
  }
};

module.exports = verifyAdmin;
