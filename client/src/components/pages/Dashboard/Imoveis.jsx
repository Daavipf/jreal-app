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
        <div className="p-2.5 bg-slate-300 rounded-t-md grid grid-cols-12">
          <div className="col-span-5">
            <p>Imóvel</p>
          </div>
          <div className="col-span-2">
            <p>Valor</p>
          </div>
          <div className="col-span-2">
            <p>Status</p>
          </div>
          <div className="col-span-3">

          </div>
        </div>
        {/* LINHAS DA TABELA */}
        {realties.length > 0 &&
          realties.map((realty) => (
            <div className="p-2.5 bg-slate-200 grid grid-cols-12">
              <div className="col-span-5">
                <p>{realty.address}</p>
              </div>
              <div className="col-span-2">
                {realty.transaction_type === "For Sale" &&
                  <p>V - {Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                }
                {realty.transaction_type === "For Rent" &&
                  <p>A - {Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                }
                {realty.transaction_type === "Sale/Rent" &&
                  <>
                    <p>V - {Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                    <p>A - {Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                  </>
                }
              </div>
              <div className="col-span-2">
                {realty.status === "Disponível" &&
                  <p className="w-fit py-1.5 px-2.5 bg-gray-300 rounded-full flex items-center justify-center text-sm">{realty.status}</p>
                }
                {realty.status === "Ocupado" &&
                  <p className="w-fit py-1.5 px-2.5 bg-green-300 rounded-full flex items-center justify-center text-sm">{realty.status}</p>
                }
              </div>
              <div className="col-span-3 text-center">
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