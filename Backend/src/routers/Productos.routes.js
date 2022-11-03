const { Router } = require("express"); 
const routerProductos = Router(); 
const controlProducto = require("../controllers/controllerProductos"); 

routerProductos.get("/products", (req, res) => {
    res.send("Funcionalidad de Productos corriendo"); 
}); 

routerProductos.post("/new", controlProducto.productoSave); 
routerProductos.get("/", controlProducto.getProducts);
routerProductos.get("/list", controlProducto.productosList); 
routerProductos.get("/find/:id", controlProducto.productoXid); 
routerProductos.put("/edit/:id", controlProducto.productoEdit); 
routerProductos.delete("/delete/:id", controlProducto.productoDelete);
routerProductos.get("/list/:parametro", controlProducto.productoXParametro);

module.exports = routerProductos;