function Boletos() {
  return (
    <section>
      <div className="shadow-md last:rounded-b-lg flex flex-row md:flex-col">
        <div className="p-2.5 rounded-l-lg md:rounded-bl-none md:rounded-t-lg bg-JReal-200 grid grid-cols-1 grid-rows-6 md:grid-rows-1 md:grid-cols-6">
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Vencimento</p>
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Tipo de Pagamento</p>
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Nº da parcela</p>
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Status</p>
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Valor</p>
          <p className="border-b border-slate-400 md:border-none text-white md:text-center">Baixar PDF</p>
        </div>
        <div className="p-2.5 grid grid-cols-1 grid-rows-6 md:grid-rows-1 md:grid-cols-6 items-center text-sm">
          <p className="border-b md:border-b-0 md:border-r text-center">Dados vindo do banco Inter</p>
          <p className="border-b md:border-b-0 md:border-r"></p>
          <p className="border-b md:border-b-0 md:border-r"></p>
          <p className="border-b md:border-b-0 md:border-r"></p>
          <p className="border-b md:border-b-0 md:border-r"></p>
          <a href="/#" className="text-JReal-200 underline text-center">Baixar</a>
        </div>
      </div>
    </section>
  )
}

export default Boletos