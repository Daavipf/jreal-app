require('dotenv').config()
const express = require('express')
const cors = require('cors')
const serverless = require('serverless-http')

const app = express()
const PORT = process.env.PORT || 5000

// Config JSON response
app.use(express.json())

// Solve CORS
//Aqui vem a url do frontend quando estiver no netlify
app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))

// Public folder for images
app.use(express.static('public'))

// Routes
const auth = require('./routes/auth')
const user = require('./routes/user')
const realty = require('./routes/realty')
//const transfer = require('./routes/transfer')
app.use('/auth', auth)
app.use('/user', user)
app.use('/realty', realty)
//app.use('/transfer', transfer)

//exports.handler = serverless(app)

app.listen(PORT, () => {
  console.log(`Conectado ao Back-End na porta ${PORT}`)
})