import { Outlet } from "react-router-dom"

/* components */
import Container from './Container'
import SidebarComponent from "./Sidebar"
import SupportChat from "./SupportChat"
import FooterNav from './FooterNav'

function Layout() {
  return (
    <>
      <SidebarComponent />
      <Container>
        <Outlet />
      </Container>
      <SupportChat />
      <FooterNav/>
      <footer className="hidden w-full p-1.5 fixed bottom-0 border-t bg-white md:flex justify-center">
        <p className="text-sm text-gray-600">JReal Imóveis &copy; Todos os direitos reservados | Desenvolvido por <a href="https://davipfdev.online/" target="blank">Davi Pereira</a></p>
      </footer>
    </>
  )
}

export default Layout