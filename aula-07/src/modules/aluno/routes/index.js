const express = require('express');
const AlunoController = require('../controllers/AlunoController');

const router = express.Router();

router.post('/alunos', AlunoController.criar);
router.put('/alunos/:id', AlunoController.editar);
router.get('/alunos', AlunoController.listar);
router.get('/alunos/:id', AlunoController.listarPorID);
router.delete('/alunos/:id', AlunoController.excluirPorID);
router.delete('/alunos', AlunoController.excluirTodos);

module.exports = router;
