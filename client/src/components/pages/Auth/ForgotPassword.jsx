import Input from "../../form/Input"
import { useContext, useState } from 'react'
import { Link } from "react-router-dom"
import drawing from '../../../assets/img/Forgot password-rafiki.svg'
import { Context } from "../../../context/UserContext"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const { forgotPassword } = useContext(Context)
  //função para setar os valores digitados no form dentro do objeto email
  function handleChange(e) {
    setEmail({ ...email, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    forgotPassword(email)
  }

  return (
    <section className="h-screen w-screen bg-hero bg-cover flex justify-center items-center" /*style={{ backgroundImage: `url(${bgImage})`, width: '100vw' }}*/>
      <div className="w-2/3 flex justify-between">
        <div className="w-1/2 flex flex-col justify-around">
          <h1 className="text-center text-3xl">Esqueceu a senha? Sem problema!</h1>
          <img src={drawing} alt="imagem bacana" className="w-2/3" />
        </div>
        <div className="w-1/2 flex justify-center">
          <div className="h-full w-2/3 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-around">
            <h2 className="text-lg">Digite o e-mail da sua conta</h2>
            <p className="text-sm">Aguarde um pouco e enviaremos um e-mail com um link para você redefinir a sua senha</p>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <Input type="email" name="email" placeholder="Digite o seu e-mail" handleOnChange={handleChange} />
              <button type="submit" className="w-40 p-2.5 mt-8 self-center bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Enviar e-mail</button>
            </form>
            <Link to="/login" className="text-JReal-200">Voltar</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ForgotPassword