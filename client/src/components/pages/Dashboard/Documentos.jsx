function Documentos() {
  return (
    <section>
      <div className="shadow-md last:rounded-b-lg">
        <div className="p-2.5 rounded-t-lg bg-JReal-200 grid grid-cols-6">
          <p className="text-white  col-span-3">Título</p>
          <p className="text-white ">Tipo</p>
          <p className="text-white ">Adicionado em</p>
          <p className="text-white ">Baixar</p>
        </div>
        <div className="p-2.5 grid grid-cols-6 items-center text-sm">
          <p className="border-r  col-span-3">Documento 1.pdf</p>
          <p className="border-r">Seguro</p>
          <p className="border-r">22/06/2024</p>
          <a href="/#" className="text-JReal-200 underline ">Baixar</a>
        </div>
      </div>
    </section>
  )
}

export default Documentos