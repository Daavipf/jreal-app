const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')

//middlewares
const verifyToken = require('../helpers/check-token')
const protect = require('../middlewares/authMiddleware')

router.get('/viewuser', UserController.getUserByToken)
//role está nos parametros para diferenciar na tela de edição de imovel
router.get('/list-users/:role', verifyToken, protect(['admin']), UserController.listUsers)
router.get('/:id', UserController.getUserById)
router.patch('/edit', verifyToken, UserController.editUser)
router.patch('/editbanking', verifyToken, protect(['owner', 'realtor']), UserController.editUserBankingData)

module.exports = router