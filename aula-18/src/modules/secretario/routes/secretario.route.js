const express = require('express');
const router = express.Router();
const AlunoController = require('../controllers/aluno.controller');


// Rotas relacionadas a Alunos
router.post('secretario/criar-aluno', AlunoController.criarAluno);
router.get('/secretario/listar-alunos', AlunoController.listarAlunos);
router.get('secretario/listar-aluno/:matricula', AlunoController.listarAlunoPorMatricula);
router.put('secretario/editar-aluno', AlunoController.editarAluno);
router.delete('secretario/deletar-aluno/:matricula', AlunoController.deletarAlunoPorMatricula);
router.delete('secretario/deletar-alunos', AlunoController.deletarTodosAlunos);