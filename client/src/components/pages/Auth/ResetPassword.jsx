import Input from "../../form/Input"
import { useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { Context } from "../../../context/UserContext"

function ResetPassword() {
  const { token } = useParams()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { resetPassword } = useContext(Context)

  function handleChange(e) {
    setPassword({ ...password, [e.target.name]: e.target.value })
    setConfirmPassword({ ...confirmPassword, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    resetPassword(password, confirmPassword, token)
  }

  return (
    <section className="h-screen w-screen bg-hero bg-cover flex justify-center items-center" /*style={{ backgroundImage: `url(${bgImage})`, width: '100vw' }}*/>
      <div className="w-5/6 md:w-2/3 flex justify-between">
        <div className="w-full flex justify-center">
          <div className="h-full w-full md:w-2/3 p-6 bg-white rounded-lg shadow-lg flex flex-col items-center justify-around">
            <h2 className="text-lg">Digite sua nova senha</h2>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <Input type="password" name="password" placeholder="Digite sua nova senha" handleOnChange={handleChange} />
              <Input type="password" name="confirmPassword" placeholder="Confirme a senha" handleOnChange={handleChange} />
              <button type="submit" className="w-40 p-2.5 mt-8 self-center bg-JReal-200 hover:bg-JReal-100 rounded-lg text-gray-100 hover:text-gray-700 transition-colors">Mudar senha</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword