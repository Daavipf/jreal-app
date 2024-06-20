import RealtyCard from './RealtyCard'

function RealtyList() {
  return (
    <div className='w-full bg-white'>
      <h5 className='font-semibold'>Seus imóveis</h5>
      <div>
        <RealtyCard />
      </div>
    </div>
  )

}

export default RealtyList