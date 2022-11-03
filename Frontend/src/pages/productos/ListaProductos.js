import React from "react";
import Adminbar from "../../components/Adminbar";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import APIInvoke from "../../utils/APIInvoke"; 
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { confirm } from "react-confirm-box";

const ListaProductos = () => {

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

    const [productos, setProductos] = useState([]); 

    const cargarProductos = async () =>{
        const response = await APIInvoke.invokeGET("/products/list"); 
        console.log(response); 
        setProductos(response); 
    }

    useEffect(()=>{
        cargarProductos(); 
    },[])

    const eliminarProducto = async (e, id)=>{
        e.preventDefault(); 

        const confirmar =  await confirm("¿Desea eliminar este registro?"); 
        let msj, titulo, tipo; 

        if(confirmar){
            const response = await APIInvoke.invokeDELETE("/products/delete/"+id);
            console.log(response.mensaje); 

            msj = "Producto eliminado correctamente"; 
            tipo = "success";
            titulo = "Proceso exitoso"; 
            alerta(msj, tipo, titulo); 

            cargarProductos(); 
        }else{
            msj = "No se ha eliminado el registro"; 
            tipo = "warning";
            titulo = "Advertencia"; 
            alerta(msj, tipo, titulo); 
        }
    }

    const onSubmit = async (e, id) => {
        e.preventDefault(); 
        const parametro = document.getElementById("parametro").value; 
        
        const consulta = await APIInvoke.invokeGET("/products/list/"+parametro); 

        let msj, tipo, titulo; 

        if(consulta.mensaje === "sin registros"){
            msj = "No se generaron registros en la consulta"; 
            tipo = "warning";
            titulo = "Información"; 
            alerta(msj, tipo, titulo);
            document.getElementById("parametro").value = "";  
        }
        else {
            setProductos(consulta); 
            document.getElementById("parametro").value = "";  
        }
    }

    return (
        <div className="content">
            <Adminbar />

            <main className="flex-shrink-0">
                <div className="container">
                    <br></br>
                    <h2 className="mt-5">Lista de Productos</h2>
                    <form onSubmit={onSubmit}><br></br>
                        <div className="row">
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Ingrese un valor</span>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="parametro" 
                                    name="parametro"
                                    aria-describedby="inputGroupFileAddon04" 
                                    aria-label="Upload" 
                                />
                                <button className="btn btn-secondary" type="submit" id="inputGroupFileAddon04">Buscar</button>
                            </div>
                        </div>
                    </form>
                    <div className="row mt-4">
                        <table className="table table-striped table-hover">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">Nombre</th>
                                    <th scope="col">Imagen</th>
                                    <th scope="col">Precio</th>
                                    <th> Acciones </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productos.map(
                                        item => 
                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.img}</td>
                                            <td>{item.price}</td>
                                            <td>
                                                <Link class="btn btn-outline-success mx-3"
                                                    to={`/edit/${item._id}`} >
                                                    Actualizar
                                                </Link>
                                                <button 
                                                    class="btn btn-outline-secondary"
                                                    onClick={(e)=> eliminarProducto(e, item._id)}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default ListaProductos; 