import React from "react";
import Adminbar from "../../components/Adminbar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke"; 
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ActualizarProducto = () => {

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

    const navegador = useNavigate(); 
    const { id } = useParams(); 

    const [producto, setProducto] = useState({
        name: "",
        img: "", 
        price: ""
    }); 
    
    const { name, img, price } = producto; 
    
    useEffect(()=>{
        const cargarDatos = async ()=>{
            const response = await APIInvoke.invokeGET("/products/find/"+id);
            setProducto(response);    
        }
        document.getElementById("name").focus(); 
        cargarDatos();
    },[id]); 

    const onChange = (e)=>{
        setProducto({
            ...producto,
            [e.target.name]: e.target.value
        }); 
    }

    const editarProducto = async ()=>{
        const data = {
            name: producto.name, 
            img: producto.img, 
            price: producto.price
        }

        const response = await APIInvoke.invokePUT("/products/edit/"+id, data);
        let msj, tipo, titulo; 

        if(response.mensaje === "Editado correctamente"){
            msj = "Producto editado correctamente"; 
            tipo = "success";
            titulo = "Proceso exitoso"; 
            alerta(msj, tipo, titulo);

            navegador("/list"); 
        }
        else {
            msj = "No se pudo editar el producto"; 
            tipo = "error";
            titulo = "Error en el proceso"; 
            alerta(msj, tipo, titulo);

            navegador("/list");
        }
    }

    const onSubmit = (e)=>{
        e.preventDefault(); 
        editarProducto(); 
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
                                    <h2>Actualizar Producto</h2>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={onSubmit} >
                                        <div>
                                            <div className="form-floating mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="name"
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
                                            <button type="submit" className="btn btn-secondary my-2">Actualizar</button>
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

export default ActualizarProducto; 