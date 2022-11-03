const Usuario = require("../models/Usuarios");
const jwt = require("jsonwebtoken");

const usuarioSave = async (req, res) => {

    try {
        const { email } = req.body;
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({ mensaje: "Usuario Existente" });
        }
        else {
            usuario = new Usuario(req.body);
            await usuario.save();
            return res.status(200).json({ mensaje: "Usuario Creado" });
        }

        const payload = {
            usuario: { id: usuario.id },
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

const usuarioLogin = async (req, res) => {
    try {
        const { email, contra } = req.body;
        const usuario = await Usuario.findOne({ email });
        if (usuario) {
            if (usuario.contra === contra) {
                return res.status(200).json({
                    mensaje: "Ingreso",
                    usuario: usuario.id
                });
            }
            else {
                return res.status(400).json({ mensaje: "Denegado" });
            }
        }
        else {
            return res.status(400).json({ mensaje: "Denegado" });
        }

        const payload = {
            usuario: { id: usuario.id },
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

module.exports = {
    usuarioSave,
    usuarioLogin
}