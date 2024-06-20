const express = require('express')
const router = express.Router()
const RealtyController = require('../controllers/RealtyController')

//middlewares
const verifyToken = require('../helpers/check-token')
const protect = require('../middlewares/authMiddleware')
const imageUpload = require('../helpers/image-upload')

//Imóveis
router.post('/create', verifyToken, imageUpload.array('images', 99), protect(['admin']), RealtyController.createRealty)
//realtyId esta nos parametros para selecionar o imovel na tela de edição
router.post('/assign/:realtyId', verifyToken, protect(['admin']), RealtyController.assignToUser)
router.get('/read/:id', verifyToken, RealtyController.readRealty)
router.get('/read-all', verifyToken, RealtyController.showAll)
router.patch('/update/:id', verifyToken, protect(['admin']), RealtyController.updateRealty)
router.delete('/delete/:id', verifyToken, protect(['admin']), RealtyController.deleteRealty)

module.exports = router