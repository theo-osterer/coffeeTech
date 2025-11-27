// server.js
const express = require('express');
const produtoRoutes = require('./routes/produtoRoutes');
const Produto = require('./models/produto'); // Para criar a tabela
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.static('public'));

// Rotas
// Aqui dizemos: Tudo que começar com /produtos vai para o arquivo de rotas
app.use('/produtos', produtoRoutes); 

// Inicialização
const startServer = async () => {
    try {
        // Verifica conexão e tabela antes de subir o servidor
        await Produto.inicializarTabela();
        
        app.listen(PORT, () => {
            console.log(`🚀 Servidor MVC rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Erro fatal ao iniciar:', error);
        process.exit(1);
    }
};

startServer();