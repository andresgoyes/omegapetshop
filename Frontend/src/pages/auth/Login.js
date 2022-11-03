import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import APIInvoke from "../../utils/APIInvoke";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const Login = () => {

    //MENSAJE DE ALERTA
    const alerta = (mensaje, tipo, titulo) => {
        swal({
            title: titulo,
            text: mensaje,
            icon: tipo,
            buttons: {
                confirm: {
                    text: "Aceptar",
                    value: true,
                    visible: true,
                    className: "btn btn-secondary",
                    closeModal: true
                }
            }
        });
    }

    //para redireccionar de un componente a otro
    const navegador = useNavigate();

    //definimos el estado inicial de las variables
    const [usuario, setUsuario] = useState({
        email: '',
        contra: ''
    });

    const { email, contra } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        document.getElementById("email").focus();
    }, [])

    const iniciarSesion = async () => {

        const data = {
            email: usuario.email,
            contra: usuario.contra
        }

        const response = await APIInvoke.invokePOST(`/usuarios/login`, data);

        const acceso = response.mensaje;
        let titulo, msg, tipo;
        if (acceso === "Ingreso") {
            titulo = "Proceso Exitoso!";
            msg = "Ingreso exitoso al sistema";
            tipo = "success";
            alerta(msg, tipo, titulo);

            localStorage.setItem("user", response.usuario);
            //redireccionamos al home
            navegador("/Home");

            const idUsuario = localStorage.getItem("user");
            if (idUsuario === "63630ff8987c2850796aca45") {
                window.location.href = "/Admin";
            }
        }

        else if (acceso === "Denegado") {
            titulo = "Acceso Denegado";
            msg = "Usuario o contraseña incorrectos";
            tipo = "error";
            alerta(msg, tipo, titulo);
        }

        setUsuario({
            email: "",
            contra: ""
        });

    }

    const onSubmit = (e) => {
        e.preventDefault();
        iniciarSesion();

    }
    return (
        <div className="container">
            <div className="row mt-5" >
                <div className="col">

                </div>
                <div className="col-5">
                    <div className="card text-center">
                        <div className="card-header">
                            Acceso al sistema
                        </div>
                        <div className="card-body">
                            <form onSubmit={onSubmit}>
                                <div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="name@example.com"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={onChange}
                                            required
                                        />
                                        <label htmlFor="floatingInput">Correo Electrónico</label>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Contraseña"
                                            id="contra"
                                            name="contra"
                                            value={contra}
                                            onChange={onChange}
                                            required
                                        />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                </div>
                                <div className="container mt-4">
                                    <button type="submit" className="btn btn-primary my-2">Iniciar Sesión</button>
                                    <Link to={"/CrearCuenta"} className="btn btn-secondary mx-2">Crear Cuenta</Link>
                                </div>
                            </form>
                        </div>
                        <div className="card-footer text-muted">
                            ¿Olvidaste tu contraseña?
                        </div>
                    </div>
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    );
}

export default Login; 
