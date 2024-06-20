//este hook busca as informações do usuário no backend e retorna num objeto para ser usado em qualquer parte do frontend
import api from "../utils/api"

import { useState, useEffect } from "react"

export default function useUserInfo() {
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

  async function getInfo() {


    try {
      const user = await api.get(`${process.env.REACT_APP_API_URL}/user/viewuser`)
      return user
    } catch (error) {

    }

  }

  return { getInfo }
}