const mongoose = require("mongoose");

const UsuariosSchema = mongoose.Schema({
    nombre: { 
        type: String, 
        required: true, 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    contra: 
    { 
        type: String, 
        required: true, 
    }
    }, 
    {
        timestamps: true, 
        versionKey: false
    }
);

module.exports = mongoose.model("Usuario", UsuariosSchema);