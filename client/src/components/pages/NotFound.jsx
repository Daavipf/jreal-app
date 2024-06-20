import { Link } from "react-router-dom"

function NotFound() {
  return (
    <section className="w-screen h-screen flex flex-col justify-center items-center gap-8">
      <img src="" alt="Imagem de não encontrado" />
      <h1 className="text-3xl font-bold text-JReal-100">Não encontramos esta página...</h1>
      <Link to={"/dashboard/"} className="text-JReal-200 underline">Voltar ao início</Link>
    </section>
  )
}

export default NotFound