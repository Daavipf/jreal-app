function RealtyCard() {
  return (
    <div className="w-52 p-4 bg-white rounded-sm shadow-md flex flex-col">
      {/* imagem vem do back-end */}
      <img src="https://projetaronline.com/wp-content/uploads/2022/11/casa-pequena-planta-baixa-0.png" alt="" className="w-full" />
      {/* se for inquilino, mostra status de resposta e botão de detalhes */}
      <div className="">
        Aguardando resposta
      </div>
      {/* se for proprietário mostra só os detalhes */}
    </div>
  )
}

export default RealtyCard