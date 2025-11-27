// controllers/ProdutoController.js
const Produto = require('../models/produto');

const ProdutoController = {
    
    // GET /produtos
    listarTodos: async (req, res) => {
        try {
            const produtos = await Produto.listarTodos();
            res.status(200).json(produtos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro interno ao buscar produtos.' });
        }
    },

    // GET /produtos/:id
    buscarPorId: async (req, res) => {
        try {
            const produto = await Produto.buscarPorId(req.params.id);
            if (!produto) {
                return res.status(404).json({ erro: 'Produto não encontrado.' });
            }
            res.status(200).json(produto);
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao buscar o produto.' });
        }
    },

    // POST /produtos
    criar: async (req, res) => {
        const { nome, descricao, preco } = req.body;
        
        // Validação básica
        if (!nome || !descricao || !preco) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        try {
            const novoId = await Produto.criar(req.body);
            res.status(201).json({ 
                mensagem: 'Produto criado com sucesso!', 
                id: novoId, 
                produto: req.body 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ erro: 'Erro ao criar o produto.' });
        }
    },

    // PUT /produtos/:id
    atualizar: async (req, res) => {
        const { id } = req.params;
        const { nome, descricao, preco } = req.body;

        if (!nome || !descricao || !preco) {
            return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
        }

        try {
            const atualizou = await Produto.atualizar(id, req.body);
            if (!atualizou) {
                return res.status(404).json({ erro: 'Produto não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Produto atualizado!', produto: req.body });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao atualizar o produto.' });
        }
    },

    // DELETE /produtos/:id
    deletar: async (req, res) => {
        try {
            const deletou = await Produto.deletar(req.params.id);
            if (!deletou) {
                return res.status(404).json({ erro: 'Produto não encontrado.' });
            }
            res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
        } catch (error) {
            res.status(500).json({ erro: 'Erro ao excluir o produto.' });
        }
    }
};

module.exports = ProdutoController;