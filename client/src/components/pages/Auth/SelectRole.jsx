import { Card } from "flowbite-react"
import { Link } from "react-router-dom"
import ownerSVG from '../../../assets/img/owner.svg'
import renterSVG from '../../../assets/img/renter.svg'
import realtorSVG from '../../../assets/img/realtor.svg'

function SelectRole() {
  return (
    <section className="py-8 md:py-0 md:h-screen w-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl">Quem é você na JReal?</h1>
      <div className="w-2/3 my-10 flex flex-col md:flex-row flex-wrap justify-center gap-6">
        <Card href="/register-owner" className="w-full md:w-1/4 bg-white hover:bg-white border-2 border-JReal-100 hover:scale-125 transition-transform duration-300">
          <img src={ownerSVG} alt="img-proprietário" />
          <p className="text-center text-lg text-JReal-100 font-semibold">Proprietário</p>
        </Card>
        <Card href="/register-renter" className="w-full md:w-1/4 bg-white hover:bg-white border-2 border-JReal-100 hover:scale-125 transition-transform duration-300">
          <img src={renterSVG} alt="img-proprietário" />
          <p className="text-center text-lg text-JReal-100 font-semibold">Inquilino</p>
        </Card>
        <Card href="/register-realtor" className="w-full md:w-1/4 bg-white hover:bg-white border-2 border-JReal-100 hover:scale-125 transition-transform duration-300">
          <img src={realtorSVG} alt="img-proprietário" />
          <p className="text-center text-lg text-JReal-100 font-semibold">Corretor</p>
        </Card>
      </div>
      <p>Já tem conta? <Link to="/login" className="text-JReal-200">Clique aqui.</Link></p>
    </section>
  )
}

export default SelectRole