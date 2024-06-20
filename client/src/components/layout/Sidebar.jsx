import { Link } from 'react-router-dom'
import { IoHomeOutline, IoPieChartOutline, IoLogOutOutline, IoBarcodeOutline } from 'react-icons/io5'
import { PiSignatureThin } from "react-icons/pi"
import { TfiFiles } from "react-icons/tfi"
import logo from '../../assets/img/Logo 2.png'

import api from '../../utils/api'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../context/UserContext'

function SidebarComponent() {
  const { logout } = useContext(Context)
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

  return (
    <aside aria-label="Default sidebar example" className='hidden md:block'>
      <nav className='p-6 h-screen min-w-fit w-[12%] fixed left-0 top-0 z-10 shadow-lg bg-white dark:bg-slate-900 flex flex-col justify-between'>
        <img src={logo} alt="logo" className='w-52 mb-16' />
        <ul className='h-full gap-2'>
          <li>
            <Link to={'/dashboard/'} className='px-2.5 py-1 hover:bg-slate-100 rounded-lg flex items-center gap-4'>
              <IoPieChartOutline />
              Home
            </Link>
          </li>
          {user.role !== "renter" ? (
            <li>
              <Link to={'/dashboard/imoveis'} className='px-2.5 py-1 hover:bg-slate-100 rounded-lg flex items-center gap-4'>
                <IoHomeOutline />
                Imóveis
              </Link>
            </li>
          )
            : null
          }

          <li>
            <Link to={'/dashboard/boletos'} className='px-2.5 py-1 hover:bg-slate-100 rounded-lg flex items-center gap-4'>
              <IoBarcodeOutline />
              Boletos
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/documentos'} className='px-2.5 py-1 hover:bg-slate-100 rounded-lg flex items-center gap-4'>
              <TfiFiles />
              Documentos de locação
            </Link>
          </li>
          <li>
            <Link to={'/dashboard/contratos'} className='px-2.5 py-1 hover:bg-slate-100 rounded-lg flex items-center gap-4'>
              <PiSignatureThin />
              Contratos
            </Link>
          </li>
        </ul>
        <li onClick={logout} className='mt-auto flex items-center gap-4 cursor-pointer'>
          <IoLogOutOutline />
          Sair
        </li>
      </nav>
    </aside>
  );
}

export default SidebarComponent