import { useContext, useState } from "react"
import Input from "../../form/Input"
import { Link } from "react-router-dom"
import { Context } from "../../../context/UserContext"

function Register() {
  //objeto do usuário vai ser colcado aqui
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  //função para setar os valores digitados no form dentro do objeto user
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    //evita o page reload
    e.preventDefault()

    //lê os dados do formulário
    const form = e.target
    const formData = new FormData(form)
    //passa os campos do formulário como um objeto
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    //envia os dados para o back-end
    register(formJson)
  }

  return (
    <section className="w-screen py-6 bg-hero bg-cover flex flex-col items-center justify-center">
      <div className="w-5/6 md:w-2/3 ">
        <h1 className="text-left text-xl font-semibold">Registrar-se como proprietário</h1>
        <form onSubmit={handleSubmit} className="my-4 flex flex-col md:grid md:grid-cols-2 gap-4">
          <input type="hidden" name="role" value="owner" />
          <Input type="text" name="name" text="Nome completo" placeholder="João Xavier da Silva" handleOnChange={handleChange} />
          <Input type="text" name="phone" text="Telefone" placeholder="(85) 91234-5678" handleOnChange={handleChange} />
          <Input type="text" name="cpf_cnpj" text="CPF/CNPJ" placeholder="123.456.789-00" handleOnChange={handleChange} />
          <Input type="date" name="birth_date" text="Data de nascimento" handleOnChange={handleChange} />
          <Input type="text" name="address" placeholder="Rua XV de Novembro, 123 - Centro, Fortaleza - CE" text="Endereço" handleOnChange={handleChange} />
          <Input type="email" name="email" text="E-mail" placeholder="joao.silva@gmail.com" handleOnChange={handleChange} />
          <div className="my-6 py-4 border-y flex flex-col col-span-2 md:grid md:grid-cols-2 gap-4">
            <Input type="text" name="bank" text="Banco" handleOnChange={handleChange} />
            <Input type="text" name="agency" text="Agência" handleOnChange={handleChange} />
            <Input type="text" name="account" text="Conta" handleOnChange={handleChange} />
          </div>
          <Input type="password" name="password" text="Senha" placeholder="*************" handleOnChange={handleChange} />
          <Input type="password" name="confirmPassword" text="Confirme a sua senha" placeholder="*************" handleOnChange={handleChange} />
          <button type="submit" className="w-40 p-2.5 mt-8 self-center bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Registrar</button>
        </form>
        <p className="text-left">Já tem conta? <Link to="/login" className="text-JReal-200">Clique aqui</Link>.</p>
      </div>

    </section>
  )
}

export default Register