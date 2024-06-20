import { useState, useEffect } from "react"
import { Navigate } from "react-router-dom"
import api from "../utils/api"

function AdminRoute({ children }) {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

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

  return user.role === "admin" ? (<>{children}</>) : (<Navigate to={"/dashboard/"} replace={true} />)
}

export default AdminRoute