const app = require("./app");
const express = require("express");
const conectarDB = require("./database");
const cors = require("cors"); 
const usuarioRouter = require("./src/routers/Usuarios.routes"); 
const productoRouter = require("./src/routers/Productos.routes");
const routerCarts = require("./src/routers/Carts.routes");

//conectar a la base de datos
conectarDB();

//Habilite express.json
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 4000;

app.use(cors());

app.listen(PORT, ()=>{
    console.log("Servidor en el puerto "+PORT); 
}); 

app.use("/usuarios", usuarioRouter); 
app.use("/products", productoRouter);
app.use("/carts", routerCarts);

app.get("/", (req, res) => {
    res.send("Api Funcionando"); 
})