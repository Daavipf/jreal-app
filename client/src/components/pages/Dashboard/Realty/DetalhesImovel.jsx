import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import api from "../../../../utils/api"
import useFlashMessage from "../../../../hooks/useFlashMessage"


import { Modal } from "flowbite-react"
import AdminComponent from "../../../AdminComponent"
import { Tabs } from "flowbite-react"

import { IoTrashOutline } from "react-icons/io5"
import { GoPencil } from "react-icons/go"

function DetalhesImovel() {
  const [realty, setRealty] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()
  //passando isso como um objeto apenas para calar o erro do react
  const underline = {
    underline: "underline"
  }

  //pega os imóveis no banco ao carregar a página
  //manda a requisição para a api com o token
  useEffect(() => {
    api.get(`/realty/read/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((response) => {
      setRealty(response.data.realty)
    })
  }, [token, id])

  //chama a rota de deletar na api e redireciona para a lista dos imóveis
  async function deleteRealty() {
    setOpenModal(false)

    const data = await api.delete(`/realty/delete/${realty._id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    })

    navigate('/dashboard/imoveis')
    setFlashMessage(data.data.message)
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="self-end flex items-center gap-4">
        <AdminComponent>
          <Link to={`/dashboard/imoveis/update/${realty._id}`}>
            <button className="p-2.5 bg-JReal-200 rounded-lg shadow self-end flex items-center gap-3 text-white">
              <GoPencil />
              <span>Editar</span>
            </button>
          </Link>
        </AdminComponent>

        <AdminComponent>
          <button onClick={() => setOpenModal(true)} className="p-2.5 bg-red-600 rounded-lg shadow self-end flex items-center gap-3 text-white">
            <IoTrashOutline />
            <span>Excluir imóvel</span>
          </button>
          <Modal show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Body>
              <p className="font-semibold text-lg">Deseja realmente excluir este imóvel?</p>
              <p>Esta ação não poderá ser desfeita</p>
            </Modal.Body>
            <Modal.Footer className="grid grid-cols-2 gap-8">
              <button onClick={deleteRealty} className="py-2.5 px-5 border border-slate-500 rounded-md">Sim</button>
              <button onClick={() => setOpenModal(false)} className="py-2.5 px-5 border border-slate-500 rounded-md">Não</button>
            </Modal.Footer>
          </Modal>
        </AdminComponent>
      </div>

      <Tabs aria-label="Tabs of realty visualization" style={underline.underline}>
        <Tabs.Item active title="Repasses" >
          <div className="flex flex-col">
            <div className="self-end">
              <AdminComponent>
                <Link to={`/dashboard/repasses/update/${realty._id}`}>
                  <button className="p-2.5 bg-JReal-200 rounded-lg shadow self-end flex items-center gap-3 text-white">
                    <GoPencil />
                    <span>Editar</span>
                  </button>
                </Link>
              </AdminComponent>
            </div>

            <h2 className="text-lg font-semibold">ID: {realty.listing_id}</h2>
            <div>
              <div className="grid grid-cols-3 gap-4 border-y">
                <p className="col-span-1 border-r">Endereço</p>
                <p className="">{realty.address}, {realty.street_number} - {realty.neighborhood}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 border-b">
                <p className="col-span-1 border-r">Tipo</p>
                {realty.usage_type === "Residential" ?
                  <p>Residencial</p>
                  : null
                }
                {realty.usage_type === "Commercial" ?
                  <p>Comercial</p>
                  : null
                }
                {realty.usage_type === "Residential/Commercial" ?
                  <p>Residencial / Comercial</p>
                  : null
                }
              </div>
              <div className="grid grid-cols-3 gap-4">
                <p className="border-r">Data do Contrato</p>
                <span>21/07/2024</span>
              </div>
              <div className="grid grid-cols-3 gap-4 border-y">
                <p className="border-r">Data da Vistoria</p>
                <span>21/07/2024</span>
              </div>
              {/* <div className="grid grid-cols-3 gap-4 border-y">
                <p className="border-r">Proprietário</p>
                {realty.owner.name !== undefined ? <span>{realty.owner.name}</span>
                  : <span></span>
                }
              </div>
              <div className="grid grid-cols-3 gap-4 border-y">
                <p className="border-r">Inquilino</p>
                {realty.renter.name !== undefined ? <span>{realty.renter.name}</span>
                  : <span></span>
                }
              </div> */}
            </div>
            <p>Tabela de repasses será implementada</p>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Anúncio">
          <AdminComponent>
            <div className="w-full md:w-2/3 grid grid-cols-3 gap-2">
              <div>
                <h3 className="text-gray-500">ID</h3>
                <p className="text-lg">{realty.listing_id}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">Título</h3>
                <p className="text-lg">{realty.title}</p>
              </div>
              <div className="col-span-2">
                <h3 className="text-gray-500">Descrição</h3>
                <p className="text-lg">{realty.description}</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 py-6 grid grid-cols-3 gap-2">
              <div className="">
                <h3 className="text-gray-500">Endereço</h3>
                <p className="text-lg">{realty.address}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">Número</h3>
                <p className="text-lg">{realty.street_number}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">Complemento</h3>
                <p className="text-lg">{realty.complement}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">Bairro</h3>
                <p className="text-lg">{realty.neighborhood}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">CEP</h3>
                <p className="text-lg">{realty.postal_code}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">Cidade</h3>
                <p className="text-lg">{realty.city}</p>
              </div>
              {realty.zone &&
                <div className="">
                  <h3 className="text-gray-500">Zona</h3>
                  <p className="text-lg">{realty.zone}</p>
                </div>
              }
              <div className="">
                <h3 className="text-gray-500">Estado</h3>
                <p className="text-lg">{realty.state}</p>
              </div>
              <div className="">
                <h3 className="text-gray-500">País</h3>
                <p className="text-lg">{realty.country}</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 py-6 grid grid-cols-2 md:grid-cols-3 gap-2">
              <div>
                <h3 className="text-gray-500">Tipo de Transação</h3>
                <p className="text-lg">{realty.transaction_type}</p>
              </div>
              {realty.transaction_type === "For Sale" &&
                <div>
                  <h3 className="text-gray-500">Preço de Venda</h3>
                  <p className="text-lg">{Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                </div>
              }
              {realty.transaction_type === "For Rent" &&
                <div>
                  <h3 className="text-gray-500">Preço de Aluguel</h3>
                  <p className="text-lg">R${Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                </div>
              }
              {realty.transaction_type === "Sale/Rent" &&
                <>
                  <div>
                    <h3 className="text-gray-500">Preço de Venda</h3>
                    <p className="text-lg">{Number(realty.list_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                  </div>
                  <div>
                    <h3 className="text-gray-500">Preço de Aluguel</h3>
                    <p className="text-lg">{Number(realty.rental_price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                  </div>
                </>
              }
              <div>
                <h3 className="text-gray-500">IPTU</h3>
                <p className="text-lg">{Number(realty.iptu).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Condomínio</h3>
                <p className="text-lg">{Number(realty.admin_fee).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
              </div>
            </div>
            <div className="w-full md:w-2/3 py-6 grid grid-cols-3 md:grid-cols-4 gap-2">
              <div>
                <h3 className="text-gray-500">Tipo de Utilização</h3>
                <p className="text-lg">{realty.usage_type}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Tipo de Propriedade</h3>
                <p className="text-lg">{realty.property_type}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Área</h3>
                <p className="text-lg">{realty.area}m²</p>
              </div>
              <div>
                <h3 className="text-gray-500">Nº de Quartos</h3>
                <p className="text-lg">{realty.bedroom}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Nº de Banheiros</h3>
                <p className="text-lg">{realty.bathroom}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Nº de Suítes</h3>
                <p className="text-lg">{realty.suite}</p>
              </div>
              <div>
                <h3 className="text-gray-500">Vagas de Garagem</h3>
                <p className="text-lg">{realty.garage}</p>
              </div>
              {realty.floors ?
                <div>
                  <h3 className="text-gray-500">Andares</h3>
                  <p className="text-lg">{realty.floors}</p>
                </div>
                : null
              }
              {realty.unit_floor ?
                <div>
                  <h3 className="text-gray-500">Andar do imóvel</h3>
                  <p className="text-lg">{realty.unit_floor}</p>
                </div>
                : null
              }
              {realty.buildings ?
                <div>
                  <h3 className="text-gray-500">Torres no Condomínio</h3>
                  <p className="text-lg">{realty.buildings}</p>
                </div>
                : null
              }
              {realty.year_built ?
                <div>
                  <h3 className="text-gray-500">Ano de Construção</h3>
                  <p className="text-lg">{realty.year_built}</p>
                </div>
                : null
              }
            </div>
            <div className="w-full md:w-2/3 py-6 grid grid-cols-2 gap-2">
              {realty.video ?
                <div>
                  <h3 className="text-gray-500">Vídeo do Youtube</h3>
                  <a href={realty.video} target="blank" className="text-lg text-JReal-200">{realty.video}</a>
                </div>
                : null
              }
            </div>
          </AdminComponent>
        </Tabs.Item>

      </Tabs>


    </section>
  )
}

export default DetalhesImovel