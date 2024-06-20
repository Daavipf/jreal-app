const express = require('express')
const router = express.Router()
const multer = require('multer')

const transferController = require('../controllers/TransferController')

//middlewares
const verifyToken = require('../helpers/check-token')
const protect = require('../middlewares/authMiddleware')
const upload = multer({ dest: 'public/transfers-csv' })

router.post('/upload-csv', upload.single('csv-file'), transferController.uploadCSV)

module.exports = router