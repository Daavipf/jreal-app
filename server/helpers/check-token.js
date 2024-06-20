const jwt = require("jsonwebtoken")
const getToken = require('./get-token')

// middleware to validate token
const checkToken = (req, res, next) => {
  //const authHeader = req.headers["authorization"]
  //const token = authHeader && authHeader.split(" ")[1]
  if (!req.headers.authorization) return res.status(401).json({ message: "Acesso negado!" })

  const token = getToken(req)

  if (!token) return res.status(401).json({ message: "Acesso negado!" })

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    req.user = verified
    next(); // to continue the flow
  } catch (err) {
    res.status(401).json({ message: "Houve um erro na sua solicitação" })
  }
};

module.exports = checkToken