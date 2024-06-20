const mongoose = require('mongoose')

async function main() {
  //Aqui vem a url do banco no atlas (provavelmente)
  await mongoose.connect(process.env.MONGO_URI)
  console.log('Conectado ao banco de dados')
}

main().catch((err) => console.log(err))

module.exports = mongoose
