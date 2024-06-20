function Boletos() {
  return (
    <section>
      <div className="shadow-md last:rounded-b-lg">
        <div className="p-2.5 rounded-t-lg bg-JReal-200 grid grid-cols-6">
          <p className="text-white text-center">Vencimento</p>
          <p className="text-white text-center">Tipo de Pagamento</p>
          <p className="text-white text-center">Nº da parcela</p>
          <p className="text-white text-center">Status</p>
          <p className="text-white text-center">Valor</p>
          <p className="text-white text-center">Baixar PDF</p>
        </div>
        <div className="p-2.5 grid grid-cols-6 items-center text-sm">
          <p className="border-r text-center">Dados vindo do banco Inter</p>
          <p className="border-r"></p>
          <p className="border-r"></p>
          <p className="border-r"></p>
          <p className="border-r"></p>
          <a href="/#" className="text-JReal-200 underline text-center">Baixar</a>
        </div>
      </div>
    </section>
  )
}

export default Boletos