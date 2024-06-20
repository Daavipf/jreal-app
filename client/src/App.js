import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Layout */
import Layout from './components/layout/Layout'
import Message from "./components/layout/Message"

/* páginas */
import Login from './components/pages/Auth/Login'
import RegisterOwner from './components/pages/Auth/RegisterOwner'
import RegisterRealtor from './components/pages/Auth/RegisterRealtor'
import RegisterRenter from './components/pages/Auth/RegisterRenter'
import SelectRole from "./components/pages/Auth/SelectRole"
import ForgotPassword from './components/pages/Auth/ForgotPassword'
import ResetPassword from "./components/pages/Auth/ResetPassword"
import NotFound from "./components/pages/NotFound"

import Home from "./components/pages/Dashboard/Home"
import Imoveis from './components/pages/Dashboard/Imoveis'
import Boletos from "./components/pages/Dashboard/Boletos"
import Documentos from "./components/pages/Dashboard/Documentos"
import Contratos from "./components/pages/Dashboard/Contratos"
import Settings from "./components/pages/Dashboard/Settings"

import AddImovel from "./components/pages/Dashboard/Realty/AddImovel"
import DetalhesImovel from "./components/pages/Dashboard/Realty/DetalhesImovel"
import UpdateRealty from "./components/pages/Dashboard/Realty/UpdateImovel";

/* context */
import { UserProvider } from "./context/UserContext"

/* proteção de rotas */
import ProtectedRoute from './components/ProtectedRoute'
//import AdminRoute from './components/AdminRoute'

function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-owner" element={<RegisterOwner />} />
          <Route path="/register-realtor" element={<RegisterRealtor />} />
          <Route path="/register-renter" element={<RegisterRenter />} />
          <Route path="/selectrole" element={<SelectRole />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/dashboard/" element={<Home />} />
            <Route path="/dashboard/imoveis" element={<Imoveis />} />
            <Route path="/dashboard/boletos" element={<Boletos />} />
            <Route path="/dashboard/documentos" element={<Documentos />} />
            <Route path="/dashboard/contratos" element={<Contratos />} />
            <Route path="/dashboard/settings" element={<Settings />} />

            <Route path="/dashboard/imoveis/cadastrar" element={<AddImovel />} />
            <Route path="/dashboard/imoveis/:id" element={<DetalhesImovel />} />
            <Route path="/dashboard/imoveis/update/:id" element={<UpdateRealty />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Message />
      </UserProvider>
    </BrowserRouter >
  );
}

export default App;
