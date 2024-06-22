import { Button } from 'flowbite-react'
import { IoFileTrayFullOutline, IoNewspaperOutline } from "react-icons/io5"
import { LiaFileContractSolid } from "react-icons/lia"
import { Link } from 'react-router-dom'
import { IconContext } from "react-icons"

//components
import RealtyList from './components/RealtyList'

function Home() {
  return (
    <section className='flex flex-col gap-4'>
      <div className='flex flex-col md:grid md:grid-cols-3 gap-4'>
        <div className='p-6 bg-white rounded-md shadow-md flex flex-col justify-between gap-3'>
          <div className='flex items-center gap-4'>
            <IconContext.Provider value={{ size: '24px', className: "global-class-name" }}>
              <div>
                <IoFileTrayFullOutline />
              </div>
            </IconContext.Provider>
            <h5 className='text-lg font-semibold'>Documentos de Locação</h5>
          </div>
          <p>
            Consulte os documentos relacionados aos seus imóveis
          </p>
          <Button as={Link} to="/dashboard/documentos" className='bg-JReal-200 hover:bg-JReal-200/90'>Ver Mais</Button>
        </div>
        <div className='p-6 bg-white rounded-md shadow-md flex flex-col justify-between gap-3'>
          <div className='flex items-center gap-4'>
            <IconContext.Provider value={{ size: '24px', className: "global-class-name" }}>
              <div>
                <IoNewspaperOutline />
              </div>
            </IconContext.Provider>
            <h5 className='text-lg font-semibold'>2ª via de boleto</h5>
          </div>
          <p>
            Consulte os seus boletos e seus status de vencimento
          </p>
          <Button as={Link} to="/dashboard/boletos" className='bg-JReal-200 hover:bg-JReal-200/90'>Ver Mais</Button>
        </div>
        <div className='p-6 bg-white rounded-md shadow-md flex flex-col justify-between gap-3'>
          <div className='flex items-center gap-4'>
            <IconContext.Provider value={{ size: '24px', className: "global-class-name" }}>
              <div>
                <LiaFileContractSolid />
              </div>
            </IconContext.Provider>
            <h5 className='text-lg font-semibold'>Assinatura de contrato</h5>
          </div>
          <p>
            Realize a assinatura digital de contratos referentes aos seus imóveis
          </p>
          <Button as={Link} to="/dashboard/contratos" className='bg-JReal-200 hover:bg-JReal-200/90'>Ver Mais</Button>
        </div>
      </div>
      <RealtyList />
    </section>
  )
}

export default Home