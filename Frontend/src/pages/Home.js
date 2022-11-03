import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Cart from "../components/Cart";
import Products from "../components/Products";
import styles from '../components/Home/styles.module.scss';
import { useNavigate } from "react-router-dom";

const Home = () => {
    
    const navigate = useNavigate();
    const idUsuario = localStorage.getItem("user");
    if (idUsuario === null) {
        navigate("/");
    }
    
    return (
        <div className="d-flex flex-column h-100">
            <Navbar />
            <br></br>
            <br></br>
            <main className="flex-shrink-0">
                <div className={styles.home}>
                    <Cart />
                    <Products />
                </div>
            </main>
            <br></br>
            <br></br>
            <Footer />
        </div>
    );
}

export default Home;