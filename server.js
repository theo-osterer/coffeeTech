const express = require('express');
const connectDB = require('./db');

// BUG 1: Falta importar a conexão com o banco
// BUG 2: Falta criar a "loja" (instância do app)
// Dica: const app = ...
const app = express();
const PORT = 3000;

// BUG 3: O Express não sabe ler JSON (falta middleware)
// BUG 4: O site (index.html) não carrega porque não definimos a pasta pública
app.use(express.json()); 
app.use(express.static('public')); 

// BUG 5: Esta rota está "roubando" o lugar do index.html


const startServer = async () => {
  try {
    // BUG 6: O servidor tenta abrir a porta ANTES de conectar no banco
    await connectDB(); 

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });

  } catch (error) {
    console.error('Falha ao iniciar:', error);
  }
};

// BUG 7: A função existe, mas ninguém mandou ela rodar.
startServer();