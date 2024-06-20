const fs = require('fs')

// Função para deletar arquivos
const deleteLocalFiles = (files) => {
  files.forEach(file => {
    fs.unlink(file.path, (err) => {
      if (err) {
        console.error('Erro ao deletar arquivo:', err)
      }
    })
  })
}

module.exports = deleteLocalFiles