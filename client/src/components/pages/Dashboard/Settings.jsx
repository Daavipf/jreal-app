import { useState, useEffect } from "react"
import api from "../../../utils/api"
import { Tabs } from "flowbite-react"
import useFlashMessage from "../../../hooks/useFlashMessage"

import { PiUserCircleLight, PiCurrencyDollarSimpleFill } from "react-icons/pi"
import { HiAdjustments } from "react-icons/hi"

import Input from '../../form/Input'

function Settings() {
  const [user, setUser] = useState({})
  //const [bank, setBank] = useState("")
  const [token] = useState(localStorage.getItem('token') || '')
  const { setFlashMessage } = useFlashMessage()
  //passando isso como um objeto apenas para calar o erro do react
  const underline = {
    underline: "underline"
  }

  //pega o usuário no banco ao carregar a página
  //manda a requisição para a api com o token
  useEffect(() => {
    api.get(`/user/viewuser`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((response) => {
      setUser(response.data)
    })
  }, [token])

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmitUserinfo = async (e) => {
    //evita o page reload
    e.preventDefault()

    //lê os dados do formulário
    const form = e.target
    const formData = new FormData(form)
    //passa os campos do formulário como um objeto
    const formJson = Object.fromEntries(formData.entries())
    //console.log(formJson)

    //faz a chamada para a api e envia os dados do formulário
    const data = await api.patch('/user/edit', formJson, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((response) => {
      console.log(response.data)
      return response.data
    }).catch((err) => {
      console.log(err)
      return err.response.data
    })

    setFlashMessage(data.message)
  }

  const handleSubmitBankingData = async (e) => {
    //evita o page reload
    e.preventDefault()

    //lê os dados do formulário
    const form = e.target
    const formData = new FormData(form)
    //passa os campos do formulário como um objeto
    const formJson = Object.fromEntries(formData.entries())
    //console.log(formJson)


    //faz a chamada para a api e envia os dados do formulário
    const data = await api.patch('/user/editbanking', formJson, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((response) => {
      console.log(response.data)
      return response.data
    }).catch((err) => {
      console.log(err)
      return err.response.data
    })

    setFlashMessage(data.message)
  }

  return (
    <section>
      <Tabs aria-label="Tabs with underline" style={underline.underline}>
        <Tabs.Item active title="Informações" icon={PiUserCircleLight}>
          <h2 className="mb-4 font-semibold text-lg">Informações pessoais</h2>
          <div className="w-2/3 grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <h3 className="">Nome:</h3>
              <p className=" text-gray-600">{user.name}</p>
            </div>
            <div>
              <h3 className="">Cadastrado como:</h3>
              <p className=" text-gray-600">{user.role}</p>
            </div>
            <div>
              <h3 className="">E-mail:</h3>
              <p className=" text-gray-600">{user.email}</p>
            </div>
            <div>
              <h3 className="">Telefone:</h3>
              <p className=" text-gray-600">{user.phone}</p>
            </div>
            <div>
              <h3 className="">Endereço:</h3>
              <p className=" text-gray-600">{user.address}</p>
            </div>
            <div>
              <h3 className="">CPF/CNPJ:</h3>
              <p className=" text-gray-600">{user.cpf_cnpj}</p>
            </div>
            <div>
              <h3 className="">Data de nascimento:</h3>
              <p className=" text-gray-600">{user.birth_date}</p>
            </div>
            {user.role === "owner" || user.role === "realtor" ?
              <div className="pt-4 border-t col-span-2 grid grid-cols-2 gap-4">
                <h2 className="font-semibold text-lg col-span-2">Informações bancárias</h2>
                <div>
                  <h3 className="">Banco:</h3>
                  <p className=" text-gray-600">{user.banking_data.bank}</p>
                </div>
                <div>
                  <h3 className="">Conta:</h3>
                  <p className=" text-gray-600">{user.banking_data.account}</p>
                </div>
                <div>
                  <h3 className="">Agência:</h3>
                  <p className=" text-gray-600">{user.banking_data.agency}</p>
                </div>
              </div>
              : null}
            {user.role === "realtor" ?
              <div className="pt-4 border-t col-span-2 grid grid-cols-2 gap-4">
                <h2 className="font-semibold text-lg col-span-2">Informações de corretor</h2>
                <div>
                  <h3 className="">Número CRECI:</h3>
                  <p className="text-gray-600">{user.creci_number}</p>
                </div>
                <div>
                  <h3 className="">Validade do CRECI:</h3>
                  <p className="text-gray-600">{user.creci_expiration}</p>
                </div>
              </div>
              : null}
          </div>
        </Tabs.Item>
        <Tabs.Item title="Editar" icon={HiAdjustments}>
          <div className="md:w-2/3 h-full overflow-auto">
            <h2 className="text-left text-xl font-semibold">Informações pessoais</h2>
            <form onSubmit={handleSubmitUserinfo} className="my-4 flex flex-col md:grid md:grid-cols-2 gap-4">
              <Input type="text" name="name" text="Nome completo" defaultValue={user.name || ''} handleOnChange={handleChange} />
              <Input type="text" name="phone" text="Telefone" defaultValue={user.phone || ''} handleOnChange={handleChange} />
              <Input type="text" name="cpf_cnpj" text="CPF/CNPJ" defaultValue={user.cpf_cnpj || ''} handleOnChange={handleChange} />
              <Input type="date" name="birth_date" text="Data de nascimento" defaultValue={user.birth_date} handleOnChange={handleChange} />
              <Input type="text" name="address" placeholder="Nenhum endereço cadastrado" defaultValue={user.address || ''} text="Endereço" handleOnChange={handleChange} />
              <Input type="email" name="email" text="E-mail" defaultValue={user.email || ''} handleOnChange={handleChange} />

              <Input type="password" name="password" text="Senha" placeholder="*************" handleOnChange={handleChange} />
              <Input type="password" name="confirmPassword" text="Confirme a sua senha" placeholder="*************" handleOnChange={handleChange} />
              {user.role === "realtor" || user.role === "admin" ?
                <div className="py-4 mt-4 border-t col-span-2 grid grid-cols-2 gap-4">
                  <h2 className="col-span-2 text-left text-xl font-semibold">Informações de corretor</h2>
                  <Input type="number" name="creci_number" text="Número Creci" defaultValue={user.creci_number} handleOnChange={handleChange} />
                  <Input type="date" name="creci_expiration" text="Data de validade do Creci" defaultValue={user.creci_expiration} handleOnChange={handleChange} />
                </div>
                : null}
              <button type="submit" className="w-40 p-2.5 mt-8 self-center bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Atualizar</button>
            </form>
          </div>
        </Tabs.Item>
        {user.role === "owner" || user.role === "realtor" || user.role === "admin" ?
          <Tabs.Item title="Pagamento" icon={PiCurrencyDollarSimpleFill}>
            <div className="w-2/3 h-full overflow-auto">
              <h2 className="text-left text-xl font-semibold">Informações bancárias</h2>
              <form onSubmit={handleSubmitBankingData} className="my-4 flex flex-col md:grid md:grid-cols-2 gap-4">

                <Input type="text" name="bank" text="Banco" handleOnChange={handleChange} />
                <Input type="text" name="agency" text="Agência" handleOnChange={handleChange} />
                <Input type="text" name="account" text="Conta" handleOnChange={handleChange} />
                <button type="submit" className="w-40 p-2.5 mt-8 self-center col-span-2 bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Atualizar</button>
              </form>
            </div>
          </Tabs.Item>
          : null}
      </Tabs>
    </section>
  )
}

export default Settings