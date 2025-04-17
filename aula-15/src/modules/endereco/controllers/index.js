const EnderecoModel = require('../models/index');



class EnderecoController {
    static async criarEndereco(requisicao, resposta) {
        try {
            const { matricula, cep, numero, ponto_referencia } = requisicao.body;
            if (!matricula || !cep || !numero || !ponto_referencia) {
                return resposta.status(400).json({ mensagem: "Todos os campos devem ser preenchidos." });
            }
            const novoEndereco = await EnderecoModel.criarEndereco(matricula, cep, numero, ponto_referencia);
            resposta.status(201).json({ mensagem: "Endereço criado com sucesso", endereco: novoEndereco });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao criar o endereço!", erro: error.message });
        }
    }

    static async editarEndereco(requisicao, resposta) {
        try {
            const { matricula } = requisicao.params;
            const { cep, numero, ponto_referencia } = requisicao.body;
            if (!cep || !numero) {
                return resposta.status(400).json({ mensagem: "Pelo menos um campo deve ser atualizado." });
            }
            const enderecoAtualizado = await EnderecoModel.editarEndereco(matricula, cep, numero, ponto_referencia);
            if (enderecoAtualizado.length === 0) {
                return resposta.status(400).json({ mensagem: "Endereço não encontrado." });
            }
            resposta.status(200).json({ mensagem: "Endereço atualizado com sucesso", endereco: enderecoAtualizado });
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao editar endereço.", erro: error.message });
        }
    }

    static async listarEnderecoCEP(requisicao, resposta) {
        try {
            const cep  = requisicao.params.cep;
            const endereco = await EnderecoModel.listarEnderecoCEP(cep);
            if (endereco.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum endereço encontrado para esse CEP." });
            }
            resposta.status(200).json(endereco);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao buscar endereços pelo CEP.", erro: error.message });
        }
    }

    static async listarEnderecoCidade(requisicao, resposta) {
        try {
            const { localidade } = requisicao.params;
            const enderecos = await EnderecoModel.listarEnderecoCidade(localidade);
            if (enderecos.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum endereço encontrado para essa cidade." });
            }
            resposta.status(200).json(enderecos);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao buscar endereços pela cidade.", erro: error.message });
        }
    }

    static async listarEnderecos(requisicao, resposta) {
        try {
            const enderecos = await EnderecoModel.listarEnderecos();
            if (enderecos.length === 0) {
                return resposta.status(400).json({ mensagem: "Nenhum endereço cadastrado." });
            }
            resposta.status(200).json(enderecos);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao listar endereços.", erro: error.message });
        }
    }

    static async listarEndereco(requisicao, resposta) {
        try {
            const { matricula } = requisicao.params;
            const endereco = await EnderecoModel.listarEndereco(matricula);
            if (endereco.length === 0) {
                return resposta.status(400).json({ mensagem: "Endereço não encontrado para essa matrícula." });
            }
            resposta.status(200).json(endereco);
        } catch (error) {
            resposta.status(500).json({ mensagem: "Erro ao buscar endereço.", erro: error.message });
        }
    }
}

module.exports = EnderecoController;
