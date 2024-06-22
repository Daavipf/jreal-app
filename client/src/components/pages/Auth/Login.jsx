import Input from "../../form/Input"
import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import drawing from '../../../assets/img/login-img.svg'

//context
import { Context } from "../../../context/UserContext"

function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)
  //função para setar os valores digitados no form dentro do objeto user
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    //evita o page reload
    e.preventDefault()

    //faz o login do usuário no sistema
    login(user)
  }

  return (
    <section className="h-screen w-screen bg-hero bg-cover flex justify-center items-center" /*style={{ backgroundImage: `url(${bgImage})`, width: '100vw' }}*/>
      <div className="w-5/6 md:w-2/3 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-around">
          <h1 className="text-center text-xl md:text-3xl">Sua nova experiência em gestão de imóveis</h1>
          <img src={drawing} alt="imagem bacana" className="w-2/3" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="h-full w-full md:w-2/3 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-around">
            <h2 className="text-lg">Entre com sua conta</h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <Input type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} />
              <Input type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleChange} />
              <p className="text-sm text-center text-gray-700">Esqueceu a senha? <Link to="/forgot-password" className="text-JReal-200">Clique aqui</Link></p>
              <button type="submit" className="w-40 p-2.5 mt-8 self-center bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Entrar</button>
            </form>
            <p>Não tem uma conta? <Link to="/selectrole" className="text-JReal-200">Clique aqui.</Link></p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login