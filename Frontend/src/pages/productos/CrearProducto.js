import React from "react";
import Adminbar from "../../components/Adminbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import APIInvoke from "../../utils/APIInvoke"; 
import swal from "sweetalert";

const CrearProducto = () => {

    const idUsuario = localStorage.getItem("user");
    if (idUsuario !== "63630ff8987c2850796aca45") {
        window.location.href = "/Home";
    }

    const alerta= (mensaje, tipo, titulo)=>{
        swal({
            title: titulo,
            text: mensaje, 
            icon: tipo,
            buttons: {
                confirm:{
                    text: "Aceptar",
                    value: true, 
                    visible: true,
                    className: "btn btn-secondary",
                    closeModal: true
                }
            }
        });
    }
    
    const [producto, setProducto] = useState({
        name: "",
        img: "", 
        price: ""
    }); 

    const { name, img, price } = producto; 


    const onChange = (e) => {
        setProducto({
            ...producto, 
            [e.target.name]: e.target.value 
        });
    }

    useEffect(()=>{
        document.getElementById("name").focus(); 
    }, []); 

    const crearProducto = async ()=>{
        //RECUPERAR LOS DATOS DEL HOOK
        const data = {
            name: producto.name, 
            img: producto.img,
            price: producto.price
        }

        //INVOCAR LA PETICION 
        const response = await APIInvoke.invokePOST("/products/new", data); 
        const mensaje = response.mensaje; 
        let msj, tipo, titulo;
       
        //VALIDAR 
        if(mensaje === "producto creado"){
            msj = "Producto guardado correctamente"; 
            tipo = "success";
            titulo = "Proceso exitoso"; 
            alerta(msj, tipo, titulo); 

            //LIMPIAR CAJAS 
            setProducto({
                name: "",
                img: "",
                price: ""
            }); 
        }
        else if(mensaje === "producto existente"){
            msj = "Existe un producto con el mismo nombre"; 
            tipo = "error";
            titulo = "No se pudo guardar"; 
            alerta(msj, tipo, titulo); 
        }

        
    }

    const onSubmit = (e) => {
        e.preventDefault(); 
        crearProducto(); 
    }

    return (
        <div className="content">
            <Adminbar />
            <main>
                <div className="container">
                    <br></br>
                    <br></br>
                    <div className="row mt-5" >
                        <div className="col">

                        </div>
                        <div className="col-8">
                            <div className="card text-center">
                                <div className="card-header">
                                    <h2>Crear Producto</h2>
                                </div>
                                <div className="card-body">
                                <form onSubmit={onSubmit} >
                            <div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="nombre"
                                        name="name"
                                        value={name}
                                        onChange={onChange}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Nombre</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="img"
                                        placeholder="imagen"
                                        name="img"
                                        value={img}
                                        onChange={onChange}
                                        required
                                    />
                                    <label htmlFor="floatingInput">Imagen</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="price"
                                        placeholder="precio"
                                        name="price"
                                        value={price}
                                        onChange={onChange}
                                        required
                                    />
                                    <label htmlFor="floatingPassword">Precio</label>
                                </div>
                            </div>
                            <div className="container mt-4">
                                <button type="submit" className="btn btn-secondary my-2">Crear Producto</button>
                            </div>
                        </form>
                                </div>
                                <div className="card-footer text-muted">
                                    Todos los campos son obligatorios
                                </div>
                            </div>
                        </div>
                        <div className="col">
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default CrearProducto; 