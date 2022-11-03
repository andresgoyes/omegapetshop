const { Router } = require("express");

const routerCarts = Router();
const controlCart = require("../controllers/controllerCarts");

routerCarts.get("/carts", (req, res) => {
    res.send("Funcionalidad de Carts Activa");
});

routerCarts.get("/", controlCart.getProductsCart);
routerCarts.post("/", controlCart.addProductCart);
routerCarts.put("/:productId", controlCart.putProduct);
routerCarts.delete("/:productId", controlCart.delProductCart);

module.exports = routerCarts;