import { Link } from 'react-router-dom'
import { IoHomeOutline, IoPieChartOutline, IoBarcodeOutline } from 'react-icons/io5'
import { PiSignatureThin } from "react-icons/pi"
import { TfiFiles } from "react-icons/tfi"

function FooterNav() {
    return (
        <footer className="block md:hidden">
            <nav className="w-screen p-2.5 fixed bottom-0 left-0 shadow-md bg-white flex justify-around items-center">
                <ul className="flex justify-around items-center gap-2">
                    <li>
                        <Link to={'/dashboard'} className="flex flex-col items-center">
                            <IoPieChartOutline className="text-xl" />
                            <span className="text-sm">Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/imoveis'} className="flex flex-col items-center">
                            <IoHomeOutline className="text-xl" />
                            <span className="text-sm">Imóveis</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/boletos'} className="flex flex-col items-center">
                            <IoBarcodeOutline className="text-xl" />
                            <span className="text-sm">Boletos</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/documentos'} className="flex flex-col items-center">
                            <TfiFiles className="text-xl" />
                            <span className="text-sm">Doc. Locação</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={'/dashboard/contratos'} className="flex flex-col items-center">
                            <PiSignatureThin className="text-xl" />
                            <span className="text-sm">Contratos</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    )
}

export default FooterNav