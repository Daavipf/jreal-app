//esse código usa as funções dos hooks dentro do contexto do usuário

import { createContext } from "react"
import useAuth from "../hooks/useAuth"

const Context = createContext()

function UserProvider({ children }) {
  const { register, login, authenticated, logout, forgotPassword, resetPassword } = useAuth()

  return (
    <Context.Provider value={{ register, login, authenticated, logout, forgotPassword, resetPassword }}>
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }