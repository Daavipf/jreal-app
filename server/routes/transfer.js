const express = require('express')
const router = express.Router()
const multer = require('multer')

const TransferController = require('../controllers/TransferController')

//middlewares
const verifyToken = require('../helpers/check-token')
const protect = require('../middlewares/authMiddleware')
const upload = multer({ dest: '/tmp' })

//router.post('/upload-csv', upload.single('csv-file'), transferController.uploadCSV)
router.post('/create', verifyToken, protect(['admin']), TransferController.createTransfer)
router.patch('/insert-data', verifyToken, protect(['admin']), TransferController.insertData)

module.exports = router