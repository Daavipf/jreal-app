import { Dropdown } from "flowbite-react"
import profilePicture from '../../assets/img/Profile.svg'
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
    <>
      <div className="flex items-center justify-between gap-6">
        <div className="py-2.5 px-6 bg-white rounded-full shadow flex">
          <div>
            <h3 className="text-sm">{user.name}</h3>
            <h4 className="text-xs">{user.email}</h4>
          </div>
          <Dropdown label="" className="text-gray-700" inline>
            <Dropdown.Item>
              <Link to={'/dashboard/settings'}>Configurações</Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sair</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="w-24 h-24 p-1 rounded-full bg-JReal-100">
          <img src={profilePicture} alt="" />
        </div>
      </div>
    </>
  )
}

export default Profile