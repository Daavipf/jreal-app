import { Link } from "react-router-dom"
import { PiHeadset } from "react-icons/pi"
import { IconContext } from "react-icons/lib"

function SupportChat() {
  return (
    <Link to="https://api.whatsapp.com/send/?phone=5585997250000&text=Ol%C3%A1%2C+gostaria+de+falar+com+a+JReal+Im%C3%B3veis.&type=phone_number&app_absent=0" target="_blank" className="p-2.5 fixed z-10 bottom-16 md:bottom-10 right-5 bg-JReal-200 rounded-full md:rounded-lg flex items-center gap-4">
      <IconContext.Provider value={{ size: '32px', color: '#fff' }}>
        <div>
          <PiHeadset />
        </div>
      </IconContext.Provider>
      <p className="text-white hidden md:inline">Central de<br /> atendimento</p>
    </Link>
  )
}

export default SupportChat