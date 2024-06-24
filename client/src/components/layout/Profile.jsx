import { Dropdown } from "flowbite-react"
import profilePicture from '../../assets/img/Profile.svg'
import logo from '../../assets/img/Logo 1.png'
import { Link } from "react-router-dom"

import { useContext, useState, useEffect } from "react"
import { Context } from "../../context/UserContext"
import api from "../../utils/api"

function Profile() {
  const { logout } = useContext(Context)
  const [user, setUser] = useState({})
  const [token] = useState(localStorage.getItem('token') || '')

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
    <div className="px-2.5 flex justify-between">
      <img src={logo} alt="logo" width={'120px'} className="m-2 block md:hidden"/>
      <div className="flex items-center justify-end md:justify-between gap-2 md:gap-6">
        
        <div className="py-2.5 md:px-6 md:bg-white md:rounded-full md:shadow flex">
          <div>
            <h3 className="text-sm text-white md:text-gray-700">{user.name}</h3>
            <h4 className="text-xs text-white md:text-gray-700">{user.email}</h4>
          </div>
          <Dropdown label="" className="text-white  md:text-gray-700" inline>
            <Dropdown.Item>
              <Link to={'/dashboard/settings'}>Conta</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-10 h-10 md:w-24 md:h-24 p-1 rounded-full bg-JReal-100">
          <img src={profilePicture} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Profile