//este código cria as funções que enviam as requisições da api

import api from '../utils/api'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false)
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()

  //Envia o token pelo header para o backend
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
      setAuthenticated(true)
    }
  }, [])

  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'

    try {
      //Envia para a rota post da api no backend
      await api.post('/auth/register', user).then((response) => {
        return response.data
      })

      navigate('/login')
    } catch (error) {
      msgText = error.response.data.message
    }

    setFlashMessage(msgText)
  }

  //loga o usuário
  async function login(user) {
    let msgText = "Login realizado com sucesso"

    try {
      const data = await api.post('/auth/login', user).then((response) => {
        return response.data
      })
      await authUser(data)
    } catch (error) {
      msgText = error.response.data.message
    }

    setFlashMessage(msgText)
  }

  //desloga o usuário, remove o token do localStorage
  function logout() {
    const msgText = "Logout realizado com sucesso"

    setAuthenticated(false)
    localStorage.removeItem('token')
    api.defaults.headers.Authorization = undefined
    navigate('/login')

    setFlashMessage(msgText)
  }

  async function forgotPassword(email) {
    let msgText = ""
    try {
      await api.post('/auth/redefinepassword', (email))
      msgText = "Link enviado"
    } catch (error) {
      msgText = error.response.data.message
    }

    setFlashMessage(msgText)
  }

  async function resetPassword(password, confirmPassword, token) {
    let msgText = ""
    try {
      await api.patch(`/auth/redefinepassword/${token}`, (password, confirmPassword))
      msgText = "Sua senha foi alterada com sucesso"
      navigate('/login')
    } catch (error) {
      msgText = error.response.data.message
    }

    setFlashMessage(msgText)
  }

  //muda o estado do usuário para autenticado, salva o token e redireciona ela para a home
  async function authUser(data) {
    setAuthenticated(true)
    localStorage.setItem('token', JSON.stringify(data.token))
    navigate('/dashboard/')
  }
  return { login, logout, authenticated, register, forgotPassword, resetPassword }
}
