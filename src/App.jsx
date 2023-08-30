import './App.css'//Asi se invoca a hoja de estilos
import MainHeader from './common/MainHeader'
import MainFooter from './common/MainFooter'
import MainNav from './common/MainNav'
import Inicio from './pages/Inicio'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inversiones from './pages/Inversiones'
import Proveedores from './pages/Proveedores'
import Empleados from './pages/Empleados'
import Tienda from './pages/Tienda'
import ProductoDetalles from './pages/ProductoDetalles'
import Carrito from './pages/Carrito'
import Directores from './pages/Directores'
import Pedidos from './pages/Pedidos'
import Pagina404 from './pages/Pagina404'
import Seleccionados from './pages/Seleccionados'
import PedidoDetalles from './pages/PedidoDetalles'


function App() {
  return (
    <>{/* Esta es una etiqueta vacía */}
      <BrowserRouter>
        <MainHeader />
        <MainNav />

        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inversiones" element={<Inversiones />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/directores" element={<Directores />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/seleccionados" element={<Seleccionados />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/productodetalles/:idproducto" element={<ProductoDetalles />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/detallepedidos/:idpedido" element={<PedidoDetalles />} />
          <Route path="*" element={<Pagina404 />} />
        </Routes>

        <MainFooter />
      </BrowserRouter>
    </>
  )
}

export default App

