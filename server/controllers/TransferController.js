const csv = require('csvtojson')
const Transfer = require('../models/Transfer')
const Realty = require('../models/Realty')
const User = require('../models/User')

module.exports = class TransferController {
  static async uploadCSV(req, res) {
    const csvFile = req.file

    if (!csvFile) {
      return res.status(422).json({ message: "Nenhum arquivo enviado" })
    }

    const csvFilePath = csvFile.path
    csv()
      .fromFile(csvFilePath)
      .then((jsonObj) => {
        //Data.insertMany(jsonObj)
        return res.status(201).json({ message: "Dados adicionados", jsonObj })
      })
      .catch((err) => {
        return res.status(500).json(err)
      })
  }

  //Estes dados serão inseridos apenas uma vez, na criação do objeto de repasse 
  static async createTransfer(req,res){
    const {realtyId, data_contrato, data_vistoria, ownerId, renterId} = req.body 

    try{
      const realty = await Realty.findById(realtyId)
      const owner = await User.findById(ownerId)
      
      const newTransfer = new Transfer({
        data_contrato,
        data_vistoria,
        owner: owner,
        realty: realty,
      })

      return res.status(200).json({message:"Deu certo", newTransfer})
    } catch(error){
      return res.status(404).json({message:"Dados não encontrados"})
    }
  }

  static async insertData(req,res){
    return res.status(200).json({message:"rota funcionando"})
  }
}