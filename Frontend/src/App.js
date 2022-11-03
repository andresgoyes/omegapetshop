import React from "react";
import { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Login from "./pages/auth/Login";
import CrearCuenta from "./pages/auth/CrearCuenta";
import CrearProducto from "./pages/productos/CrearProducto";
import ListaProductos from "./pages/productos/ListaProductos";
import ActualizarProducto from "./pages/productos/ActualizarProducto";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Fragment>          
        <Router>
          <Routes>
            <Route path="/" exact element={<Login />} />
            <Route path="/CrearCuenta" exact element={<CrearCuenta />} />
            <Route path="/Home" exact element={<CartProvider><Home /></CartProvider>} />
            <Route path="/Admin" exact element={<Admin />} />
            <Route path="/list" exact element={<ListaProductos />} />
            <Route path="/new" exact element={<CrearProducto />} />
            <Route path="/edit/:id" exact element={<ActualizarProducto />} />
          </Routes>
        </Router>
      </Fragment>
  );
}

export default App;