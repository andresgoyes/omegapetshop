import React from "react";
import Adminbar from "../components/Adminbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Admin = () => {

    const navigate = useNavigate();
    const idUsuario = localStorage.getItem("user");
    if (idUsuario === null) {
        navigate("/");
    }

    return (
        <div className="d-flex flex-column h-100">
            <Adminbar />
            <main className="flex-shrink-0">
                <div className="d-flex flex-column h-100">
                    {window.location.href = "/List"};
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Admin;