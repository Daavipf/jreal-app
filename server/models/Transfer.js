const mongoose = require('../db/conn')

const dataSchema = new mongoose.Schema({
  credito: { type: Number },
  debito: { type: Number },
  comissao: { type: Number },
  saldo: { type: Number },
  d_c: { type: Boolean },
  data_vencimento: { type: Date, required: true },
  nome: { type: String },
  mes: { type: String, required: true }
})

const transferSchema = new mongoose.Schema({
  data_contrato: { type: Date, required: true },
  data_repasse: { type: Date },
  foi_transferido: { type: Boolean, required: true },
  data_vistoria: { type: Date, required: true },
  dados: [dataSchema],
  realty: Object,
  owner: Object,
  renter: Object
}, { timestamps: true })

const Transfer = mongoose.model('Transfer', transferSchema)

module.exports = Transfer