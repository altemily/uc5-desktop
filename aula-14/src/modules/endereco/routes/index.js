const express = require('express');
const EnderecoController = require('../controllers/index');

const router = express.Router();

router.post('/endereco', EnderecoController.criarEndereco);
router.put('/endereco/:matricula', EnderecoController.editarEndereco);
router.get('/endereco/cep/:cep', EnderecoController.listarEnderecoCEP);
router.get('/endereco/cidade/:localidade', EnderecoController.listarEnderecoCidade);
router.get('/endereco', EnderecoController.listarEnderecos);
router.get('/endereco/:matricula', EnderecoController.listarEndereco);

module.exports = router;
