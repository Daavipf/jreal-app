const express = require('express')
const router = express.Router()
const protect = require('../middlewares/authMiddleware')

const AuthController = require('../controllers/AuthController')

router.post('/register', AuthController.createAccount)
router.post('/login', AuthController.login)
router.get('/verify/:token', AuthController.verifyEmail)

//o usuário solicita redefinir a senha
router.post('/redefinepassword', AuthController.requestResetPassword)
//o usuário redefine a senha na tela de redefinição
router.patch('/redefinepassword/:token', AuthController.resetPassword)
router.get('/rotaprotegida', protect(['admin']), (req, res) => {
  res.status(200).json({ message: "Entrada autorizada" })
})


module.exports = router