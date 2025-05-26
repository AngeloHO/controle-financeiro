const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Rota para listar todos os usuários
router.get('/', usuarioController.getAllUsers);
router.post('/', usuarioController.createUser);
router.delete('/:id', usuarioController.deleteUser);
module.exports = router;