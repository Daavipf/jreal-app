const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//helpers
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')

module.exports = class UserController {
  static async getUserByToken(req, res) {
    let currentUser

    //console.log(req.headers.authorization)

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {
    const id = req.params.id
    try {
      //busca o usuário no banco e elimina o campo de senha, mostrando só o resto
      const user = await User.findById(id).select('-password')
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
      }

      return res.status(200).json({ user })
    } catch (error) {
      return res.status(400).json({ message: "Id inválido" })
    }

  }

  static async editUser(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)

    const { name, email, phone, cpf_cnpj, birth_date, address, password, confirmPassword } = req.body
    const { creci_number, creci_expiration } = req.body

    //Validações
    //checa se todos os campos foram preenchidos
    if (!name || !email || !phone || !cpf_cnpj || !birth_date) {
      return res.status(422).json({ message: "Preencha todos os campos" })
    }

    //se o e-mail for alterado, checa se o e-mail já existe
    const emailExists = await User.findOne({ email: email })
    if (user.email !== email && emailExists) {
      return res.status(400).json({ message: "Este e-mail já está em uso" })
    }

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    // check if password match
    if (password != confirmPassword) {
      return res.status(422).json({ message: 'As senhas não conferem' })
    } else if (password == confirmPassword && password !== "") {
      const salt = await bcrypt.genSalt(12)
      const reqPassword = req.body.password

      const passwordHash = await bcrypt.hash(reqPassword, salt)

      user.password = passwordHash
    }

    user.name = name
    user.email = email
    user.phone = phone
    user.cpf_cnpj = cpf_cnpj
    user.birth_date = birth_date
    user.address = address
    user.creci_number = creci_number
    user.creci_expiration = creci_expiration

    //console.log(user)
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true }
      )

      res.status(200).json({ message: "Usuário atualizado com sucesso" })
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }

  static async editUserBankingData(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    let banking_data = {
      bank: req.body.bank,
      account: req.body.account,
      agency: req.body.agency
    }

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" })
    }

    //verifica se veio algum campo em branco e passa o valor que já havia no user anteriormente
    if (banking_data.account === "") {
      banking_data.account = user.banking_data.account
    } else if (banking_data.agency === "") {
      banking_data.agency = user.banking_data.agency
    } else if (banking_data.bank === "") {
      banking_data.bank = user.banking_data.bank
    }

    try {
      user.banking_data = banking_data
      await user.save()

      return res.status(200).json({ message: "Dados atualizados" })
    } catch (error) {
      return res.status(500).json({ message: "Erro do servidor, tente novamente mais tarde" })
    }
  }

  static async listUsers(req, res) {
    const role = req.params.role

    try {
      //busca no db todos os usuários que não possuem o role admin
      const users = await User.find({ role: { $eq: role } })
      return res.status(200).json({ users })
    } catch (error) {
      return res.status(500).json({ message: "Erro do servidor, tente novamente mais tarde" })
    }
  }
}