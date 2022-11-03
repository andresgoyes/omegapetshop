const Cart = require("../models/Carts");
const Product = require("../models/Products");

const addProductCart = async (req, res) => {
    try {
        const { name, img, price } = req.body;
        /* Nos fijamos si tenemos el producto */
        const estaEnProducts = await Product.findOne({ name });

        /* Nos fijamos si todos los campos vienen con info */
        const noEstaVacio = name !== "" && img !== "" && price !== "";

        /* Nos fijamos si el producto ya esta en el carrito */
        const estaEnElCarrito = await Cart.findOne({ name });

        /* Si no tenemos el producto */
        if (!estaEnProducts) {
            res.status(400).json({
                mensaje: "Este producto no se encuentra en nuestra base de datos",
            });

            /* Si nos envian algo y no esta en el carrito lo agregamos */
        } else if (noEstaVacio && !estaEnElCarrito) {
            const newProductInCart = new Cart({ name, img, price, amount: 1 });

            /* Y actualizamos la prop inCart: true en nuestros productos */
            await Product.findByIdAndUpdate(
                estaEnProducts?._id,
                { inCart: true, name, img, price },
                { new: true }
            )
                .then((product) => {
                    newProductInCart.save();
                    res.json({
                        mensaje: `El producto fue agregado al carrito`,
                        product,
                    });
                })
                .catch((error) => console.error(error));

            /* Y si esta en el carrito avisamos */
        } else if (estaEnElCarrito) {
            res.status(400).json({
                mensaje: "El producto ya esta en el carrito",
            });
        }
    }
    catch (error) {
        console.log(error);
    }
};

const delProductCart = async (req, res) => {
    try {
        const { productId } = req.params;

        /* Buscamos el producto en el carrito */
        const productInCart = await Cart.findById(productId);

        /* Buscamos el producto en nuestra DB por el nombre del que esta en el carrito */
        const { name, img, price, _id } = await Product.findOne({
            name: productInCart.name,
        });

        /* Buscamos y eliminamos el producto con la id */
        await Cart.findByIdAndDelete(productId);

        /* Buscamos y editamos la prop inCart: false */
        /* Le pasamos la id del producto en la DB */
        /* La prop a cambiar y las demas */
        /* Y el new para devolver el producto editado */
        await Product.findByIdAndUpdate(
            _id,
            { inCart: false, name, img, price },
            { new: true }
        )
            .then((product) => {
                res.json({
                    mensaje: `El producto ${product.name} fue eliminado del carrito`,
                });
            })
            .catch((error) => res.json({ mensaje: "Hubo un error" }));
    }
    catch (error) {
        console.log(error);
    }
};

const getProductsCart = async (req, res) => {
    try {
        const productsCart = await Cart.find();

        if (productsCart) {
            res.json({ productsCart });
        } else {
            res.json({ mensaje: "No hay productos en el carrito" });
        }
    }
    catch (error) {
        console.log(error);
    }
};

const putProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const { query } = req.query;
        const body = req.body;

        /* Buscamos el producto en el carrito */
        const productBuscado = await Cart.findById(productId);

        /* Si no hay query 'add' o 'del' */
        if (!query) {
            res.status(404).json({ mensaje: "Debes enviar una query" });

            /* Si esta el producto en el carrito y quiero agregar */
        } else if (productBuscado && query === "add") {
            body.amount = body.amount + 1;

            await Cart.findByIdAndUpdate(productId, body, {
                new: true,
            }).then((product) => {
                res.json({
                    mensaje: `El producto: ${product.name} fue actualizado`,
                    product,
                });
            });

            /* Si esta el producto en el carrito y quiero sacar */
        } else if (productBuscado && query === "del") {
            body.amount = body.amount - 1;

            await Cart.findByIdAndUpdate(productId, body, {
                new: true,
            }).then((product) =>
                res.json({
                    mensaje: `El producto: ${product.name} fue actualizado`,
                    product,
                })
            );
        } else {
            res.status(400).json({ mensaje: "Ocurrio un error" });
        }
    }
    catch (error) {
        console.log(error);
    }
};

module.exports = {
    getProductsCart,
    addProductCart,
    delProductCart,
    putProduct
}