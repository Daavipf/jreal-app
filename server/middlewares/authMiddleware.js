const jwt = require('jsonwebtoken')
const getToken = require('../helpers/get-token')

const protect = (roles = []) => {
  return (req, res, next) => {
    const token = getToken(req)

    if (!token) {
      return res.status(401).json({ message: "Acesso negado: Nenhum token de autorização" })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded

      if (roles.length && !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Acesso negado: Você não tem permissão para realizar esta ação" });
      }
      next()
    } catch (error) {
      res.status(401).json({ message: "Token inválido" })
    }
  }
}

module.exports = protect