import { Navigate, Route, Routes } from "react-router-dom"
import { Asesores } from "../pages/Asesores"
import { Rutas } from "../pages/Rutas"
import { Clientes } from "../pages/Clientes"
import { Productos } from "../pages/Productos"
import { Pedidos } from "../pages/Pedidos"
import { Viaticos } from "../pages/Viaticos"
import { ReportePedidos } from "../pages/ReportePedidos"
import { ReporteViaticos } from "../pages/ReporteViaticos"
import { MaruplasPage } from "../pages/MaruplasPage"
import { useAuthStore } from "../../hooks/useAuthStore"

export const MaruplasRoutes = () => {

  const { user, startLogout } = useAuthStore();

  return (
    <Routes>
        <Route path="/" element={ <MaruplasPage /> } />
        {user.rol == 'Administrador' ? <Route path="/Asesores" element={ <Asesores /> } /> : null}
        <Route path="/Rutas" element={ <Rutas /> } />
        <Route path="/Clientes" element={ <Clientes /> } />
        <Route path="/Productos" element={ <Productos /> } />
        <Route path="/Pedidos" element={ <Pedidos /> } />
        <Route path="/Viaticos" element={ <Viaticos /> } />
        <Route path="/ReportePedidos" element={ <ReportePedidos /> } />
        <Route path="/ReporteViaticos" element={ <ReporteViaticos /> } />
        <Route exact path="/*" element={<MaruplasPage />} />
    </Routes>
  )
}
