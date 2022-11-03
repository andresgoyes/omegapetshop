const { Router } = require('express'); 
const usuarioRouter = Router(); 
var controllerUsuario = require('../controllers/controllerUsuarios');

usuarioRouter.post('/new', controllerUsuario.usuarioSave); 
usuarioRouter.post('/login', controllerUsuario.usuarioLogin); 

module.exports = usuarioRouter;