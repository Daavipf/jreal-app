import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import api from "../../../../utils/api"
import useFlashMessage from "../../../../hooks/useFlashMessage"
import { useNavigate } from "react-router-dom"

//import Input from "../../../form/Input"
//import { Modal } from "flowbite-react"

function UpdateRealty() {
  const [realty, setRealty] = useState([])
  const [owners, setOwners] = useState([])
  const [renters, setRenters] = useState([])
  const warranties = []
  const features = []
  //const [openModal, setOpenModal] = useState(false)
  const [token] = useState(localStorage.getItem('token') || '')
  const { id } = useParams()
  const { setFlashMessage } = useFlashMessage()
  const navigate = useNavigate()


  useEffect(() => {
    //pega os imóveis no banco ao carregar a página
    //manda a requisição para a api com o token
    api.get(`/realty/read/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((response) => {
      setRealty(response.data.realty)
    })

    //lista todos os usuários cadastrados como proprietários
    api.get(`/user/list-users/owner`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setOwners(response.data.users)
    })

    //lista todos os usuários cadastrados como inquilinos
    api.get(`/user/list-users/renter`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setRenters(response.data.users)
    })
  }, [token, id])

  function handleChange(e) {
    setRealty({ ...realty, [e.target.name]: e.target.value })
  }

  function handleWarrantiesArray(e) {
    const { value, checked } = e.target
    if (checked) {
      warranties.push(value)
    } else {
      warranties.splice(warranties.indexOf(value), 1)
    }
    //console.log(warranties)
  }

  function handleFeaturesArray(e) {
    const { value, checked } = e.target
    if (checked) {
      features.push(value)
    } else {
      features.splice(features.indexOf(value), 1)
    }
    //console.log(features)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //lê os dados do formulário
    const form = e.target
    const formData = new FormData(form)
    //passa os campos do formulário como um objeto
    const formJson = Object.fromEntries(formData.entries())
    //console.log(formJson)


    //faz a chamada para a api e envia os dados do formulário
    const data = await api.patch(`/realty/update/${realty._id}`, formJson, {
      headers: { Authorization: `Bearer ${JSON.parse(token)}` }
    }).then((response) => {
      //console.log(response.data)
      return response.data
    }).catch((err) => {
      //console.log(err)
      return err.response.data
    })

    navigate(`/dashboard/imoveis/${realty._id}`)
    setFlashMessage(data.message)

  }

  return (
    <section className="flex flex-col">
      <div className="mb-8 self-start md:self-end flex flex-col md:flex-row gap-8">
        <form onSubmit={
          async (e) => {
            e.preventDefault()

            const form = e.target
            const formData = new FormData(form)
            // //passa os campos do formulário como um objeto
            const formJson = Object.fromEntries(formData.entries())
            //console.log(formJson)

            const data = await api.post(`/realty/assign/${realty._id}`, formJson, {
              headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            }).then((response) => {
              //console.log(response.data)
              return response.data
            }).catch((err) => {
              //console.log(err)
              return err.response.data
            })
            setFlashMessage(data.message)
          }
        }>
          <select className="mr-2 rounded-full border-slate-300 text-gray-500" name="user" id="user">
            {owners.length > 0 &&
              owners.map((owner) => (
                <option value={owner._id}>{owner.name}</option>
              ))
            }
          </select>
          <button className="p-2.5 rounded-full bg-JReal-200 text-white text-sm" type="submit">Designar Proprietário</button>
        </form>
        <form onSubmit={
          async (e) => {
            e.preventDefault()

            const form = e.target
            const formData = new FormData(form)
            // //passa os campos do formulário como um objeto
            const formJson = Object.fromEntries(formData.entries())
            //console.log(formJson)

            const data = await api.post(`/realty/assign/${realty._id}`, formJson, {
              headers: { Authorization: `Bearer ${JSON.parse(token)}` }
            }).then((response) => {
              //console.log(response.data)
              return response.data
            }).catch((err) => {
              //console.log(err)
              return err.response.data
            })
            setFlashMessage(data.message)
          }
        }>
          <select className="mr-2 rounded-full border-slate-300 text-gray-500" name="user" id="user">
            {renters.length > 0 &&
              renters.map((renter) => (
                <option value={renter._id}>{renter.name}</option>
              ))
            }
          </select>
          <button className="p-2.5 rounded-full bg-JReal-200 text-white text-sm" type="submit">Designar Inquilino</button>
        </form>
      </div>

      <form onSubmit={handleSubmit} className="">
        <div className="flex flex-col md:grid md:grid-cols-3 gap-2">
          <div>
            <label htmlFor="title" className="">Título</label>
            <input type="text" name="title" defaultValue={realty.title} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="listing_id" className="">ID</label>
            <input type="text" name="listing_id" defaultValue={realty.listing_id} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="publication_type">Tipo de Publicação</label>
            <select name="publication_type" defaultValue={realty.publication_type} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0">
              <option selected="selected" value={realty.publication_type}>{realty.publication_type}</option>
              <option value="STANDARD">STANDARD</option>
              <option value="PREMIUM">PREMIUM</option>
              <option value="SUPER_PREMIUM">SUPER_PREMIUM</option>
              <option value="PREMIERE_1">PREMIERE_1</option>
              <option value="PREMIERE_2">PREMIERE_2</option>
              <option value="TRIPLE">TRIPLE</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="description">Descrição</label>
            <textarea name="description" defaultValue={realty.description} className="w-full p-2.5 bg-transparent border-slate-200 rounded-lg text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0"></textarea>
          </div>
        </div>
        <div className="py-8 flex flex-col md:grid md:grid-cols-3 gap-2">
          <div>
            <label htmlFor="address" className="">Rua</label>
            <input type="text" name="address" defaultValue={realty.address} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="street_number" className="">Número</label>
            <input type="text" name="street_number" defaultValue={realty.street_number} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="complement" className="">Complemento</label>
            <input type="text" name="complement" defaultValue={realty.complement} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="postal_code" className="">CEP</label>
            <input type="text" name="postal_code" defaultValue={realty.postal_code} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="neighborhood" className="">Bairro</label>
            <input type="text" name="neighborhood" defaultValue={realty.neighborhood} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="city" className="">Cidade</label>
            <input type="text" name="city" defaultValue={realty.city} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="zone" className="">Zona</label>
            <input type="text" name="zone" defaultValue={realty.zone} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="state">Estado</label>
            <select name="state" id="state" defaultValue={realty.state} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0">
              <option value="Ceará">Ceará</option>
            </select>
          </div>
          <div>
            <label htmlFor="country" className="">País</label>
            <input type="text" name="country" defaultValue="Brasil" onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
        </div>
        <div className="py-8 flex flex-col md:grid md:grid-cols-3 gap-2">
          <div>
            <label htmlFor="transaction_type">Tipo de Transação</label>
            <select name="transaction_type" id="transaction_type" className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0">
              <option selected="selected" value={realty.transaction_type}>{realty.transaction_type}</option>
              <option value="For Sale">Venda</option>
              <option value="For Rent">Aluguel</option>
              <option value="Sale/Rent">Venda/Aluguel</option>
            </select>
          </div>
          <div>
            <label htmlFor="list_price" className="">Preço de Venda</label>
            <input type="number" name="list_price" defaultValue={realty.list_price} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="rental_price" className="">Preço de Aluguel</label>
            <input type="number" name="rental_price" defaultValue={realty.rental_price} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="admin_fee" className="">Condomínio</label>
            <input type="number" name="admin_fee" defaultValue={realty.admin_fee} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="iptu" className="">IPTU</label>
            <input type="number" name="iptu" defaultValue={realty.iptu} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
        </div>
        <div className="py-8 flex flex-col md:grid md:grid-cols-4 gap-2">
          <div>
            <label htmlFor="usage_type">Tipo de Utilização</label>
            <select name="usage_type" id="usage_type" className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0">
              <option selected="selected" value={realty.usage_type}>{realty.usage_type}</option>
              <option value="Residential">Residencial</option>
              <option value="Commercial">Comercial</option>
              <option value="Residential/Commercial">Residencial/Comercial</option>
            </select>
          </div>
          <div>
            <label htmlFor="property_type">Tipo de Imóvel</label>
            <select name="property_type" id="property_type" className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0">
              <option selected="selected" value={realty.property_type}>{realty.property_type}</option>
              <option value="Residential / Apartment">Apartamento</option>
              <option value="Residential / Home">Casa</option>
              <option value="Residential / Condo">Casa de Condomínio</option>
              <option value="Residential / Village House">Casa de Vila</option>
              <option value="Residential / Farm Ranch">Chácara</option>
              <option value="Residential / Penthouse">Cobertura</option>
              <option value="Commercial / Consultório">Consultório</option>
              <option value="Commercial / Edifício Residencial">Edifício Residencial</option>
              <option value="Residential / Agricultural">Fazenda/Sítios/Chácaras</option>
              <option value="Residential / Flat">Flat</option>
              <option value="Commercial / Industrial">Galpão/Depósito/Armazém</option>
              <option value="Commercial / Hotel">Hotel/Motel/Pousada</option>
              <option value="Commercial / Building">Imóvel Comercial</option>
              <option value="Residential / Kitnet">Kitnet/Conjugado</option>
              <option value="Residential / Studio">Studio</option>
              <option value="Residential / Land Lot">Terreno / Lote / Condomínio Res.</option>
              <option value="Commercial / Land Lot">Terreno / Lote / Condomínio Com.</option>
              <option value="Commercial / Business">Ponto Comercial/Loja/Box</option>
              <option value="Commercial / Edifício Comercial">Prédio/Edifício Inteiro</option>
              <option value="Commercial / Office">Sala/Conjunto</option>
              <option value="Residential / Sobrado">Sobrado</option>
            </select>
          </div>
          <div>
            <label htmlFor="area" className="">Área</label>
            <input type="number" name="area" defaultValue={realty.area} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="bathroom" className="">Banheiros</label>
            <input type="number" name="bathroom" defaultValue={realty.bathroom} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="bedroom" className="">Quartos</label>
            <input type="number" name="bedroom" defaultValue={realty.bedroom} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="suite" className="">Suítes</label>
            <input type="number" name="suite" defaultValue={realty.suite} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="garage" className="">Vagas de Garagem</label>
            <input type="number" name="garage" defaultValue={realty.garage} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="floors" className="">Andares</label>
            <input type="number" name="floors" defaultValue={realty.floors} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="unit_floor" className="">Andar do Imóvel</label>
            <input type="number" name="unit_floor" defaultValue={realty.unit_floor} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="buildings" className="">Número de Torres</label>
            <input type="number" name="buildings" defaultValue={realty.buildings} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div>
            <label htmlFor="year_built" className="">Ano de Construção</label>
            <input type="number" name="year_built" defaultValue={realty.year_built} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
          <div className="col-span-4 my-6">
            <h3 className="font-semibold">Garantias</h3>
            <div className="flex justify-between flex-wrap">
              <div className="flex items-center gap-1">
                <input className="rounded-full border-slate-500" type="checkbox" id="security_deposit" value="SECURITY_DEPOSIT" onChange={handleWarrantiesArray} />
                <label htmlFor="security_deposit">DEPÓSITO DE SEGURANÇA</label>
              </div>
              <div className="flex items-center gap-1">
                <input className="rounded-full border-slate-500" type="checkbox" id="guarantor" value="GUARANTOR" onClick={handleWarrantiesArray} />
                <label htmlFor="guarantor">FIADOR</label>
              </div>
              <div className="flex items-center gap-1">
                <input className="rounded-full border-slate-500" type="checkbox" id="insurance_guarantee" value="INSURANCE_GUARANTEE" onClick={handleWarrantiesArray} />
                <label htmlFor="insurance_guarantee">GARANTIA DE SEGURO</label>
              </div>
              <div className="flex items-center gap-1">
                <input className="rounded-full border-slate-500" type="checkbox" id="guarantee_letter" value="GUARANTEE_LETTER" onClick={handleWarrantiesArray} />
                <label htmlFor="guarantee_letter">CARTA DE GARANTIA</label>
              </div>
              <div className="flex items-center gap-1">
                <input className="rounded-full border-slate-500" type="checkbox" id="capitalization_bonds" value="CAPITALIZATION_BONDS" onClick={handleWarrantiesArray} />
                <label htmlFor="capitalization_bonds">TÍTULOS DE CAPITALIZAÇÃO</label>
              </div>
            </div>
          </div>
          <div className="col-span-4 my-6">
            <h3 className="font-semibold">Comodidades</h3>
            <div className="flex flex-wrap justify-between gap-2 text-sm">
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="administration"
                  value="Administration"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="administration">Administração</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="alarm_system"
                  value="Alarm System"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="alarm_system">Sistema de alarme</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="armored_security_cabin"
                  value="Armored Security Cabin"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="armored_security_cabin">Guarita blindada</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="backyard"
                  value="Backyard"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="backyard">Quintal</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="balcony"
                  value="Balcony"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="balcony">Varanda</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="band_practice_room"
                  value="Band Practice Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="band_practice_room">Garage band</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="bathtub"
                  value="Bathtub"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="bathtub">Banheira</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="bar"
                  value="Bar"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="bar">Bar</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="barbecue_balcony"
                  value="Barbecue Balcony"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="barbecue_balcony">Churrasqueira na varanda</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="bbq"
                  value="BBQ"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="bbq">Churrasqueira</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="beauty_room"
                  value="Beauty Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="beauty_room">Espaço de beleza</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="bicycles_place"
                  value="Bicycles Place"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="bicycles_place">Bicicletário</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="builtin_wardrobe"
                  value="Builtin Wardrobe"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="builtin_wardrobe">Armário embutido</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="caretaker"
                  value="Caretaker"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="caretaker">Zelador</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="caretaker_house"
                  value="Caretaker House"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="caretaker_house">Casa de caseiro</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="cable_television"
                  value="Cable Television"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="cable_television">TV a cabo</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="close_to_hospitals"
                  value="Close to hospitals"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="close_to_hospitals">Perto de hospitais</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="close_to_main_roads"
                  value="Close to main roads"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="close_to_main_roads">Perto de vias de acesso</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="close_to_public_transportation"
                  value="Close to public transportation"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="close_to_public_transportation">Perto de transporte público</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="close_to_schools"
                  value="Close to schools"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="close_to_schools">Perto de Escolas</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="close_to_shopping_centers"
                  value="Close to shopping centers"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="close_to_shopping_centers">Perto de Shopping Center</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="closet"
                  value="Closet"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="closet">Closet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="controlled_access"
                  value="Controlled Access"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="controlled_access">Vigia</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="cooling"
                  value="Cooling"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="cooling">Ar condicionado</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="copa"
                  value="Copa"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500" />
                <label htmlFor="copa">Copa</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="digital_locker"
                  value="Digital Locker"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="digital_locker">Fechadura digital</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="dinner_room"
                  value="Dinner Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="dinner_room">Sala de jantar</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="eco_condominium"
                  value="Eco Condominium"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="eco_condominium">Condomínio sustentável</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="eco_garbage_collector"
                  value="Eco Garbage Collector"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="eco_garbage_collector">Coleta seletiva de lixo</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="edicule"
                  value="Edicule"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="edicule">Edícula</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="electric_charger"
                  value="Electric Charger"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="electric_charger">Carregador eletrônico para carro e bicicleta</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="elevator"
                  value="Elevator"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="elevator">Elevador</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="exterior_view"
                  value="Exterior View"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="exterior_view">Vista exterior</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="fenced_yard"
                  value="Fenced Yard"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="fenced_yard">Condomínio fechado</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="fireplace"
                  value="Fireplace"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="fireplace">Lareira</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="fitness_room"
                  value="Fitness Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="fitness_room">Espaço fitness</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="fully_wired"
                  value="Fully Wired"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="fully_wired">Cabeamento estruturado</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="furnished"
                  value="Furnished"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="furnished">Mobiliado</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="game_room"
                  value="Game room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="game_room">Salão de jogos</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="garden_area"
                  value="Garden Area"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="garden_area">Jardim</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="geminada"
                  value="Geminada"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="geminada">Geminada</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="generator"
                  value="Generator"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="generator">Gerador elétrico</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="gourmet_area"
                  value="Gourmet Area"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="gourmet_area">Espaço gourmet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="gourmet_balcony"
                  value="Gourmet Balcony"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="gourmet_balcony">Varanda gourmet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="gourmet_kitchen"
                  value="Gourmet Kitchen"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="gourmet_kitchen">Cozinha Gourmet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="gravel"
                  value="Gravel"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="gravel">Cascalho</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="green_space_park"
                  value="Green space / Park"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="green_space_park">Espaço verde / Parque</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="gym"
                  value="Gym"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="gym">Academia</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="heating"
                  value="Heating"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="heating">Aquecimento</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="home_office"
                  value="Home Office"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="home_office">Escritório</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="indoor_soccer"
                  value="Indoor Soccer"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="indoor_soccer">Quadra de futebol</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="integrated_environments"
                  value="Integrated Environments"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="integrated_environments">Ambientes integrados</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="intercom"
                  value="Intercom"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="intercom">Interfone</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="internet_connection"
                  value="Internet Connection"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="internet_connection">Conexão à internet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="jogging_track"
                  value="Jogging track"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="jogging_track">Pista de cooper</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="kitchen"
                  value="Kitchen"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="kitchen">Cozinha</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="kitchen_cabinets"
                  value="Kitchen Cabinets"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="kitchen_cabinets">Armário na cozinha</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="lake_view"
                  value="Lake View"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="lake_view">Vista para lago</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="land"
                  value="Land"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="land">Terra</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="large_kitchen"
                  value="Large Kitchen"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="large_kitchen">Cozinha grande</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="large_window"
                  value="Large Window"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="large_window">Janela grande</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="laundry"
                  value="Laundry"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="laundry">Lavanderia</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="lawn"
                  value="Lawn"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="lawn">Gramado</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="lunch_room"
                  value="Lunch Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="lunch_room">Sala de almoço</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="maids_quarters"
                  value="Maid's Quarters"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="maids_quarters">Área de serviço</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="massage_room"
                  value="Massage Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="massage_room">Sala de massagem</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="media_room"
                  value="Media Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="media_room">Cinema</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="meeting_room"
                  value="Meeting Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="meeting_room">Sala de reunião</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="mezzanine"
                  value="Mezzanine"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="mezzanine">Mezanino</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="mountain_view"
                  value="Mountain View"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="mountain_view">Vista para a montanha</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="number_of_stories"
                  value="Number of stories"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="number_of_stories">Mais de um andar</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="ocean_view"
                  value="Ocean View"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="ocean_view">Vista para o mar</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="parking_garage"
                  value="Parking Garage"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="parking_garage">Garagem</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="party_room"
                  value="Party Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="party_room">Salão de Festas</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="patrol"
                  value="Patrol"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="patrol">Ronda/Vigilância</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="paved_street"
                  value="Paved Street"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="paved_street">Rua asfaltada</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="pay_per_use_services"
                  value="Pay-per-use Services"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="pay_per_use_services">Serviço pay per use</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="pets_allowed"
                  value="Pets Allowed"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="pets_allowed">Permite animais</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="pet_space"
                  value="Pet Space"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="pet_space">Espaço Pet</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="playgorund"
                  value="Playgorund"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="playgorund">Playground</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="pool"
                  value="Pool"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="pool">Piscina</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="reception_room"
                  value="Reception Room"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="reception_room">Recepção</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="recreation_area"
                  value="Recreation Area"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="recreation_area">Área de lazer</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="reflective_pool"
                  value="Reflective Pool"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="reflective_pool">Espelhos d'água</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="sand_pit"
                  value="Sand Pit"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="sand_pit">Quadra de areia</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="sauna"
                  value="Sauna"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="sauna">Sauna</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="security_guard_on_duty"
                  value="Security Guard on Duty"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="security_guard_on_duty">Segurança 24h</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="semi_olympic_pool"
                  value="Semi Olympic Pool"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="semi_olympic_pool">Piscina semi-olímpica</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="smart_apartment"
                  value="Smart Apartment"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="smart_apartment">Apartamento inteligente</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="smart_condominium"
                  value="Smart Condominium"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="smart_condominium">Condomínio inteligente</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="solar_energy"
                  value="Solar Energy"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="solar_energy">Energia solar</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="spa"
                  value="Spa"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="spa">Spa</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="sports_court"
                  value="Sports Court"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="sports_court">Quadra poliesportiva</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="square"
                  value="Square"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="square">Praça</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="squash"
                  value="Squash"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="squash">Quadra de squash</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="stair"
                  value="Stair"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="stair">Escada</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="stores"
                  value="Stores"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="stores">Loja</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="tennis_court"
                  value="Tennis Court"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="tennis_court">Quadra de tênis</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="tv_security"
                  value="TV Security"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="tv_security">Circuito de segurança</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="utilities"
                  value="Utilities"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="utilities">Públicos essenciais</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="valet_parking"
                  value="Valet Parking"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="valet_parking">Manobrista</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="warehouse"
                  value="Warehouse"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="warehouse">Depósito</label>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id="water_tank"
                  value="Water Tank"
                  onClick={handleFeaturesArray}
                  className="rounded-full border-slate-500"
                />
                <label htmlFor="water_tank">Reservatório de água</label>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 flex flex-col md:grid md:grid-cols-3 gap-2">
          <div>
            <label htmlFor="video" className="">Vídeo do Youtube</label>
            <input type="text" name="video" defaultValue={realty.video} onChange={handleChange} className="w-full p-2.5 bg-transparent border-slate-200 rounded-full text-gray-600 placeholder:text-gray-400 focus:border-slate-200 focus:outline-transparent focus:ring-0" />
          </div>
        </div>
        <button type="submit" className="p-2.5 bg-JReal-200 rounded-lg shadow text-white">Atualizar</button>
      </form>
    </section>
  )

}

export default UpdateRealty