const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config(); // BUG 8: Adiciona a leitura do .env

// --- Configuração do MySQL ---
const connectDB = async () => {
  try {
    // BUG 9: Nomes corrigidos para bater com o arquivo .env
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST, 
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_NAME // Corrigido de MYSQL_DATABASE para MYSQL_NAME
    });

    console.log('🔌 MySQL Conectado com Sucesso!');
    return connection;

  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error.message);
    // Em produção, você pode tentar reconectar. Aqui, vamos sair.
    process.exit(1); 
  }
};
// BUG 10: connectDB é exportada implicitamente por ser uma constante neste escopo,
// e no server.js original, ela estava sendo importada de forma incorreta.
// Como estamos em um único arquivo, não precisamos exportar/importar.

// --- Configuração do Servidor Express (BUGS 1, 2, 7 Corrigidos) ---
const app = express();
const PORT = 3000;
let dbConnection; // Variável global para armazenar a conexão com o banco

// --- Middlewares (Bugs 3 e 4 Corrigidos) ---
app.use(express.json()); // BUG 3: Express para ler JSON
// Servir a pasta 'public' para arquivos estáticos como index.html e style.css
app.use(express.static('public')); // BUG 4: Define a pasta pública

// --- Rotas CRUD ---

// Rota de Teste/Raiz (BUG 5 Corrigido: Remover a rota '/' para não roubar o index.html)
// Com app.use(express.static('public')), a rota '/' serve automaticamente o public/index.html.


// CREATE: Cria um novo produto
app.post('/produtos', async (req, res) => {
    const { nome, descricao, preco } = req.body;
    if (!nome || !descricao || !preco) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios.' });
    }

    const sql = 'INSERT INTO produtos (nome, descricao, preco) VALUES (?, ?, ?)';
    try {
        const [result] = await dbConnection.execute(sql, [nome, descricao, preco]);
        res.status(201).json({ 
            mensagem: 'Produto criado com sucesso!', 
            id: result.insertId,
            produto: req.body
        });
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        res.status(500).json({ erro: 'Erro interno ao criar o produto.' });
    }
});


// READ (Todos): Lista todos os produtos
app.get('/produtos', async (req, res) => {
    const sql = 'SELECT * FROM produtos';
    try {
        const [produtos] = await dbConnection.query(sql);
        res.status(200).json(produtos);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar os produtos.' });
    }
});

// READ (Único): Busca um produto pelo ID
app.get('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM produtos WHERE id = ?';
    try {
        const [produtos] = await dbConnection.query(sql, [id]);
        if (produtos.length === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado.' });
        }
        res.status(200).json(produtos[0]);
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ erro: 'Erro interno ao buscar o produto.' });
    }
});

// UPDATE: Atualiza um produto pelo ID
app.put('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco } = req.body;
    if (!nome || !descricao || !preco) {
        return res.status(400).json({ erro: 'Todos os campos são obrigatórios para atualização.' });
    }

    const sql = 'UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?';
    try {
        const [result] = await dbConnection.execute(sql, [nome, descricao, preco, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado para atualização.' });
        }

        res.status(200).json({ 
            mensagem: 'Produto atualizado com sucesso!',
            produto: req.body
        });
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ erro: 'Erro interno ao atualizar o produto.' });
    }
});

// DELETE: Exclui um produto pelo ID
app.delete('/produtos/:id', async (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM produtos WHERE id = ?';
    try {
        const [result] = await dbConnection.execute(sql, [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Produto não encontrado para exclusão.' });
        }

        res.status(200).json({ mensagem: 'Produto excluído com sucesso!' });
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        res.status(500).json({ erro: 'Erro interno ao excluir o produto.' });
    }
});


// --- Inicialização do Servidor (BUG 6 e 7 Corrigidos) ---
const startServer = async () => {
  try {
    // BUG 6: Conecta no banco ANTES de iniciar o servidor
    dbConnection = await connectDB(); 

    // Cria a tabela 'produtos' se ela não existir
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS produtos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        descricao VARCHAR(500),
        preco DECIMAL(10, 2) NOT NULL
      )
    `;
    await dbConnection.execute(createTableSql);
    console.log('✅ Tabela "produtos" verificada/criada.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  }
};

startServer(); // BUG 7: Executa a função de inicialização