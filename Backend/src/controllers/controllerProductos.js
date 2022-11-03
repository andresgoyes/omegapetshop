const e = require("express");
const Producto = require("../models/Products"); 
const jwt = require("jsonwebtoken"); 

//Insertar
const productoSave = async (req, res) =>  {
    try {
        const {name, img, inCart, price} = req.body;

        let producto = await Producto.findOne({name});

        if(producto){
            return res.status(400).json({
                mensaje: "producto existente"
            }); 
        }
        else{
            producto = new Producto(req.body);
            await producto.save(); 
            return res.status(200).json({
                mensaje: "producto creado"
            })
        }

        const payload = {
            Producto: { id: producto.id },
        };
      
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
              expiresIn: 3600, //1 hora
            },
            (error, token) => {
              if (error) throw error;
      
              //Mensaje de confirmación
              res.json({ token });
            }
        );

    } catch (error) {
        console.error(error); 
    }
}

//Listar
const productosList = async (req, res) => {
    try {
        const listaProductos = await Producto.find(); 
        res.status(200).send(listaProductos); 
    } catch (error) {
        console.error(error); 
    }
}

const getProducts = async (req, res) => {
    const products = await Producto.find();

    if (products) {
        res.json({ products });
    } else {
        res.json({ mensaje: "No hay productos" });
    }
};

//Consultar por id
const productoXid = async (req, res) => {
    try {
        const id = req.params.id; 
        if(id){
            const producto = await Producto.findById(id);
            res.status(200).send(producto);  
        }
        else{
            res.send("No se puede tramitar la petición"); 
        }
    } catch (error) {
        console.error(error); 
    }
}

//ACTUALIZAR 
const productoEdit = async (req, res) => {
    try {
        const id = req.params.id; 
        const producto = req.body;
        await Producto.findByIdAndUpdate(id, producto); 
        return res.status(200).json({ mensaje: "Editado correctamente"}); 

        const payload = {
            producto: { id: producto.id },
        };
      
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
              expiresIn: 3600, //1 hora
            },
            (error, token) => {
              if (error) throw error;
      
              //Mensaje de confirmación
              res.json({ token });
            }
        );
    } catch (error) {
        console.log(error); 
    }
}

//ELIMINAR
const productoDelete = async (req, res) =>{
    try {
        const id = req.params.id; 
        await Producto.findByIdAndDelete(id);
        return res.status(200).json({ mensaje: "Eliminado"}); 

        const payload = {
            producto: { id: producto.id },
        };
      
        jwt.sign(
            payload,
            process.env.SECRETA,
            {
              expiresIn: 3600, //1 hora
            },
            (error, token) => {
              if (error) throw error;
      
              //Mensaje de confirmación
              res.json({ token });
            }
        );
    } catch (error) {
        console.log(error); 
    }
}

const productoXParametro = async (req, res)=>{
    try {
        const parametro = req.params.parametro;
        const producto = await Producto.find({
            $or: [
                { name: { $regex: '.*' + parametro + '.*', $options: 'i' }}
            ]
        });
        
        const nProductos = producto.length;  

        if(nProductos > 0){
            res.status(200).send(producto);
        }
        else {
            return res.status(400).json({mensaje: "sin registros"}); 
        }     
    } catch (error) {
        console.log(error); 
    }
}

module.exports = {
    productoSave, 
    productosList,
    productoXid,
    productoEdit,
    productoDelete,
    productoXParametro,
    getProducts 
}