const csv = require('csvtojson')

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
}