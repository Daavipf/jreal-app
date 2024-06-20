const mongoose = require('../db/conn')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'renter', },
  cpf_cnpj: { type: String, required: true, },//Se precisar depois troca para number
  birth_date: { type: Date, required: true, },//Se precisar depois troca para string
  phone: { type: String, required: true },
  password: { type: String, required: true, },
  address: { type: String, default: '' },
  profile: { type: String, default: '' },
  creci_number: { type: String },//Se precisar, mudar para number
  creci_expiration: { type: Date },
  banking_data: Object,
  //Arrays
  tickets: Array,
  comissions: Array,
  transfers: Array,
  requests: Array,
  documents: Array,
  contracts: Array,
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
}, { timestamps: true })

//middleware de hashing de senha já feito aqui no model
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//método para checar a confirmação de senha
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

/*const User = mongoose.model(
  'User',
  new Schema({
    name: { type: String, required: true, },
    // surname: { type: String, required: true, },
    // email: { type: String, required: true, },
    role: { type: String, default: 'renter', },
    // cpf_cnpj: { type: String, required: true, },//Se precisar depois troca para number
    // birth_date: { type: Date, required: true, },//Se precisar depois troca para string
    // phone: { type: String, required: true },
    password: { type: String, required: true, },
    // address: { type: String, required: true, },
    // profile: { type: String, },
    // banking_data: Object,
    // //Arrays
    // tickets: Array,
    // comissions: Array,
    // transfers: Array,
    // requests: Array,
    // documents: Array,
    // contracts: Array,
  }, { timestamps: true }),
)
*/
module.exports = User