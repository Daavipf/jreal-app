//MODELS 
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const Realty = require('../models/Realty')
const User = require('../models/User')
const cloudinary = require('../helpers/cloudinary')
const deleteLocalFiles = require('../helpers/delete-local-files')

module.exports = class RealtyController {

  /* MÉTODOS DE IMÓVEIS */
  static async createRealty(req, res) {
    const { listing_id,
      title,
      transaction_type,
      //location_type,
      country,
      state,
      city,
      zone,
      neighborhood,
      address,
      street_number,
      complement,
      postal_code,
      video,
      publication_type,
      list_price,
      rental_price,
      admin_fee,
      iptu,
      description,
      property_type,
      area,
      bathroom,
      bedroom,
      garage,
      floors,
      unit_floor,
      buildings,
      suite,
      year_built,
      usage_type, } = req.body

    const { warranties, features } = req.body
    //const userId = req.body.userId

    if (req.files.length > 10) {
      deleteLocalFiles(req.files)
      return res.status(422).json({ message: "Não é possível enviar mais de 10 imagens" })
    }

    //upload das imagens que vem no req.files para o cloudinary, armazenamento de imagens na nuvem
    const uploadPromises = req.files.map(file => {
      return cloudinary.uploader.upload(file.path, { folder: 'public/images' })
    })

    //Validações
    if (!title || !listing_id || !transaction_type ||
      !country || !state || !city || !neighborhood || !address || !street_number || !postal_code ||
      !publication_type || !description || !property_type ||
      !area || !bathroom || !bedroom || !usage_type) {
      return res.status(422).json({ message: "Preencha todos os campos obrigatórios" })
    }

    try {
      const uploadResults = await Promise.all(uploadPromises)
      //pega as urls das imagens enviadas e salva num array
      const imageUrls = uploadResults.map(result => result.secure_url)

      const realty = new Realty({
        listing_id,
        title,
        transaction_type,
        //location_type,
        country,
        state,
        city,
        zone,
        neighborhood,
        address,
        street_number,
        complement,
        postal_code,
        video,
        publication_type,
        list_price,
        rental_price,
        admin_fee,
        iptu,
        description,
        property_type,
        area,
        bathroom,
        bedroom,
        garage,
        floors,
        unit_floor,
        buildings,
        suite,
        year_built,
        usage_type,
        warranties,
        features,
        images: imageUrls
      })

      //console.log(realty)
      await realty.save()
      deleteLocalFiles(req.files)
      return res.status(201).json({ message: "Imóvel adicionado" })
    } catch (error) {
      return res.status(500).json({ message: "Houve um erro na sua solicitação. Contate nosso suporte" })
    }
  }

  static async assignToUser(req, res) {
    const user = req.body.user
    const realtyId = req.params.realtyId

    try {
      const selectedUser = await User.findById(user)
      const selectedRealty = await Realty.findById(realtyId)

      if (selectedUser.role === "owner") {
        selectedRealty.owner = selectedUser
      } else if (selectedUser.role === "renter") {
        selectedRealty.renter = selectedUser
        selectedRealty.status = "Ocupado"
      }

      selectedRealty.save()
      return res.status(200).json({ message: `${selectedRealty.listing_id} foi designado a ${selectedUser.name}` })
    } catch (error) {
      return res.status(500).json({ message: "Houve um erro na sua solicitação. Contate nosso suporte" })
    }

  }

  static async readRealty(req, res) {
    const id = req.params.id

    if (!id) {
      return res.status(422).json({ message: "Erro ao buscar imóvel" })
    }

    try {
      const realty = await Realty.findById(id)

      if (!realty) {
        return res.status(404).json({ message: "Imóvel não encontrado" })
      }
      return res.status(200).json({ realty })
    } catch (error) {
      return res.status(500).json({ message: "Houve um erro na sua solicitação. Contate nosso suporte" })
    }
  }

  static async showAll(req, res) {
    const token = getToken(req)
    const user = await getUserByToken(token)
    //console.log(user.role)

    try {
      let realties = undefined

      //pega os imóveis no banco baseados em qual usuário está acessando a página no momento
      switch (user.role) {
        case 'admin':
          realties = await Realty.find()
          return res.status(200).json(realties)
        case 'owner':
          realties = await Realty.find({ 'owner._id': user._id })
          return res.status(200).json(realties)
        case 'renter':
          realties = await Realty.find({ 'renter._id': user._id })
          return res.status(200).json(realties)
        default:
          break
      }
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }

  }

  static async updateRealty(req, res) {
    const updatedRealty = {
      listing_id: req.body.listing_id,
      title: req.body.title,
      transaction_type: req.body.transaction_type,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      zone: req.body.zone,
      neighborhood: req.body.neighborhood,
      address: req.body.address,
      street_number: req.body.street_number,
      complement: req.body.complement,
      postal_code: req.body.postal_code,
      video: req.body.video,
      publication_type: req.body.publication_type,
      list_price: req.body.list_price,
      rental_price: req.body.rental_price,
      admin_fee: req.body.admin_fee,
      iptu: req.body.iptu,
      description: req.body.description,
      property_type: req.body.property_type,
      area: req.body.area,
      bathroom: req.body.bathroom,
      bedroom: req.body.bedroom,
      garage: req.body.garage,
      floors: req.body.floors,
      unit_floor: req.body.unit_floor,
      buildings: req.body.buildings,
      suite: req.body.suite,
      year_built: req.body.year_built,
      usage_type: req.body.usage_type
    }
    const id = req.params.id

    try {
      const realty = await Realty.findByIdAndUpdate(id, updatedRealty)
      if (!realty) {
        return res.status(404).json({ message: "Imóvel não encontrado" })
      }
      return res.status(200).json({ message: "Imóvel atualizado" })
    } catch (error) {
      return res.status(500).json({ message: "Houve um erro na sua solicitação. Contate nosso suporte" })
    }

  }

  static async deleteRealty(req, res) {
    const id = req.params.id

    try {
      const realty = await Realty.findByIdAndDelete(id)
      if (!realty) {
        return res.status(404).json({ message: "Imóvel não encontrado" })
      }
      return res.status(200).json({ message: `O imóvel em ${realty.address} foi excluído` })
    } catch (error) {
      return res.status(500).json({ message: "Houve um erro na sua solicitação. Contate nosso suporte" })
    }
  }
}