const express = require('express');
const professorController = require('../controllers/index');
const router = express.Router();

router.post('/professores', professorController.criar);
router.put('/professores/:id', professorController.editar);
router.get('/professores', professorController.listar);
router.get('/professores/:id', professorController.listarPorID);
router.delete('/professores/:id', professorController.excluirPorID);
router.delete('/professores', professorController.excluirTodos);

module.exports = router;
