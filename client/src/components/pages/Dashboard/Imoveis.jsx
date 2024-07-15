import { useState, useEffect } from "react"
import AdminComponent from "../../AdminComponent"
import api from "../../../utils/api"
import { Link } from "react-router-dom"

import { FaPlus } from "react-icons/fa6"
import { Spinner } from "flowbite-react"

function Imoveis() {
  const [loading, setLoading] = useState(false)
  const [realties, setRealties] = useState([])
  const [token] = useState(localStorage.getItem('token') || '')

  //pega os imóveis no banco ao carregar a página
  //manda a requisição para a api com o token
  useEffect(() => {
    setLoading(true)
    api.get(`/realty/read-all`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((response) => {
      setRealties(response.data)
      setLoading(false)
    })
  }, [token])

  return (
    <section className="flex flex-col gap-6 items-end">
      <AdminComponent>
        <Link to={"/dashboard/imoveis/cadastrar"}>
          <button className="p-2.5 bg-JReal-200 rounded-lg shadow flex items-center gap-3 text-white">
            <FaPlus />
            Cadastrar
          </button>
        </Link>
      </AdminComponent>
      {/* TABELA */}
      <div className="shadow w-full">
        {/* TÍTULO DA TABELA */}
        <div className="p-2.5 bg-JReal-200 rounded-t-md hidden md:grid md:grid-cols-12 text-white">
          <div className="col-span-4 md:col-span-7">
            <p>Imóvel</p>
          </div>
          <div className="md:col-span-2">
            <p>Valor</p>
          </div>
          <div className="md:col-span-2">
            <p>Status</p>
          </div>
          <div className="col-span-1">

          </div>
        </div>
        {/* LINHAS DA TABELA */}
        {realties.length > 0 &&
          realties.map((realty) => (
            <div className="p-2.5 border-b border-slate-200 bg-white flex flex-col md:grid md:grid-cols-12 md:items-center">
              <div className="col-span-1 md:col-span-2">
                {realty.images.length > 0 ? (
                  <img src={realty.images[0]} alt="imagem" className="w-24 rounded-md" />
                ) : (
                  <img src="https://res.cloudinary.com/dxnkt6dvy/image/upload/v1718992676/property-placeholder_a9ec7710-1f1e-4654-9893-28c34e3b6399_600x_mgcz2h.jpg" alt="imagem" className="w-24 rounded-md" />
                )
                }

              </div>
              <div className="md:col-span-5">
                <p classsName="ml-3 md:ml-0">{realty.address}</p>
              </div>
              <div className="md:col-span-2">
                <span className="inline md:hidden">Valor: </span>
                {realty.transaction_type === "For Sale" &&
                  <span>V - {Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                }
                {realty.transaction_type === "For Rent" &&
                  <span>A - {Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                }
                {realty.transaction_type === "Sale/Rent" &&
                  <>
                    <p>V - {Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <p>A - {Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                  </>
                }
              </div>
              <div className="md:col-span-2">
                <span className="inline md:hidden">Status: </span>
                {realty.status === "Disponível" &&
                  <span className="w-fit py-1.5 px-2.5 bg-gray-300 rounded-full inline-block md:flex items-center justify-center text-sm">{realty.status}</span>
                }
                {realty.status === "Ocupado" &&
                  <span className="w-fit py-1.5 px-2.5 bg-green-300 rounded-full inline-block md:flex items-center justify-center text-sm">{realty.status}</span>
                }
              </div>
              <div className="col-span-1 md:text-center">
                <button>
                  <Link to={`/dashboard/imoveis/${realty._id}`}>
                    <span className="text-JReal-200 underline">Detalhes</span>
                  </Link>
                </button>
              </div>
            </div>
          ))
        }
        {loading &&
          <div className="p-2.5">
            <Spinner color="success" />
            <span>Buscando imóveis</span>
          </div>
        }
        {/* {realties.length === 0 &&
          <div className="p-2.5">
            <p>Nenhum imóvel encontrado...</p>
          </div>
        } */}
      </div>
    </section>
  )
}

export default Imoveis