import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        localStorage.removeItem("user");
        navigate("/");
    }
    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="container-fluid">
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <ul className="navbar-nav me-auto mb-2 mb-md-0">
                                <li className="nav-item">
                                    <a className="navbar-brand" href="https://lms.uis.edu.co/mintic2022/">
                                        <img src="https://lms.uis.edu.co/mintic2022/pluginfile.php/1/theme_edumy/headerlogo1/1663168415/MisionTIC-UIS.png" alt="Bootstrap" height={40} />
                                    </a>
                                </li>
                            </ul>
                            <ul className="navbar-nav">
                                <li className="nav-item d-none d-sm-inline-block">
                                    <strong onClick={cerrarSesion} className="nav-link" style={{ cursor: 'pointer' }}>Salir</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

        </div>
    );
}

export default Navbar;