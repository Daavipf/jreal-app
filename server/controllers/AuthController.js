const User = require('../models/User')
const createUserToken = require('../helpers/create-user-token')
const roles = require('../models/roles')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendEmail = require('../helpers/send-email')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class AuthController {
  static async createAccount(req, res) {
    const { name, email, phone, cpf_cnpj, birth_date, password, confirmPassword, role } = req.body
    const { bank, account, agency } = req.body
    const { creci_number, creci_expiration } = req.body

    //Validações
    //checa se todos os campos foram preenchidos
    if (!name || !password || !confirmPassword || !email || !phone || !cpf_cnpj || !birth_date) {
      return res.status(422).json({ message: "Preencha todos os campos" })
    }

    if (confirmPassword !== password) {
      return res.status(422).json({ message: "As senhas não conferem" })
    }

    //checa se o role existe
    if (!roles.roles.includes(role)) {
      return res.status(401).json({ message: "Requisição inválida, tente novamente mais tarde" })
    }

    //checa se os campos foram preenchidos nos casos dos roles diferentes
    if (role !== "renter") {
      if (!bank || !account || !agency) {
        return res.status(422).json({ message: "Preencha todos os campos" })
      }

      const banking_data = {
        account,
        agency,
        bank
      }

      if (role === "realtor") {
        if (!creci_number || !creci_expiration) {
          return res.status(422).json({ message: "Preencha todos os campos" })
        }
        if (creci_number.length > 6) {
          return res.status(422).json({ message: "O CRECI não deve ter mais de 6 dígitos" })
        }
      }
    }

    //checa se o e-mail já existe
    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({ message: "Este e-mail já está em uso" })
    }

    try {
      //cria o token de verificação que será enviado por e-mail
      const verificationToken = jwt.sign({ name }, process.env.JWT_SECRET, { expiresIn: '1d' })

      //instancia novo user
      const user = new User({
        name: name,
        email: email,
        phone: phone,
        cpf_cnpj: cpf_cnpj,
        birth_date: birth_date,
        password: password,
        role: role,
        creci_number: creci_number,
        creci_expiration: creci_expiration,
        banking_data: {
          bank: bank,
          account: account,
          agency: agency
        },
        verificationToken: verificationToken
      })

      //insere usuário no banco
      await user.save()

      //lembrar de setar as variáveis de ambiente nas plataformas de deploy
      //configuração do e-mail de verificação
      const verificationLink = `${process.env.BACKEND_URL}/auth/verify/${verificationToken}`
      const emailHtml = `<p>Please verify your account by clicking the link: <a href="${verificationLink}">Verificar conta</a></p>`
      //envia o email de autenticação de conta para o email passado no cadastro
      sendEmail(user.email, 'Verificação de conta - JReal imóveis', emailHtml)

      return res.status(201).json({ message: 'Usuário registrado com sucesso. Te enviamos um e-mail para verificar sua conta' })
      /*
        //gera o token de autenticação
        await createUserToken(user, req, res)
        */
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

  static async verifyEmail(req, res) {
    //pega o token vindo do link enviado para o email
    const { token } = req.params
    try {
      //decodifica o token e busca o usuário no banco de dados
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ username: decoded.username, verificationToken: token });

      if (!user) {
        return res.status(400).json({ message: 'Token inválido ou expirado' });
      }

      //atualiza o status de usuário verificado e insere no banco
      user.isVerified = true;
      user.verificationToken = undefined;
      await user.save();

      return res.status(200).json({ message: 'Sua conta foi verificada com sucesso' });
    } catch (error) {
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }
  }

  static async requestResetPassword(req, res) {
    const { email } = req.body
    if (!email) {
      return res.status(422).json({ message: "Preencha todos os campos" })
    }

    try {
      const user = await User.findOne({ email: email })
      if (!user) {
        return res.status(404).json({ message: "Não há um usuário cadastrado com esse e-mail" })
      }
      //cria o token de redefinição do usuário
      const resetToken = crypto.randomBytes(20).toString('hex')
      //criptografa o token e insere no banco
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
      user.resetPasswordExpires = Date.now() + 3600000 // 1 hour
      await user.save()

      //lembrar de setar as variáveis de ambiente nas plataformas de deploy
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
      const emailHtml = `<p>Você solicitou uma reddefinição de senha. <a href="${resetUrl}">Clique aqui</a> para redefinir sua senha.</p>`

      await sendEmail(user.email, 'Solicitação de redefinição de senha', emailHtml)
      res.status(200).json({ message: "Enviamos um link de redefinição de senha para o seu e-mail" })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async resetPassword(req, res) {
    const { token } = req.params
    const { password, confirmPassword } = req.body

    //validações
    if (!password || !confirmPassword) {
      return res.status(400).json({ message: "Preencha a senha e a confirmação de senha" })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "As senhas não conferem" })
    }

    try {
      //descriptografa o token que veio na URL e verifica se bate com algum usuário no banco
      const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex')
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpires: { $gt: Date.now() }
      })

      if (!user) {
        return res.status(400).json({ message: "Token inválido ou expirado" });
      }

      //salva a nova senha e apaga o token de redefinição para fechar o ciclo de redefinição
      user.password = password
      user.resetPasswordToken = undefined
      user.resetPasswordExpires = undefined
      await user.save()

      return res.status(200).json({ message: "Senha redefinida com sucesso" })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }

  }

  static async login(req, res) {
    const { email, password } = req.body

    //Validações
    if (!email || !password) {
      return res.status(422).json({ message: "Preencha todos os campos" })
    }

    try {
      const user = await User.findOne({ email })
      //checa se o usuário existe e checa se a senha está certa, método escrito lá no model
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: "E-mail ou senha inválidas, tente novamente" })
      }
      //checa se o usuário foi verificado
      if (!user.isVerified) {
        return res.status(401).json({ message: "Sua conta ainda não foi verificada, cheque a caixa de entrada do seu e-mail" })
      }
      await createUserToken(user, req, res)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }
}