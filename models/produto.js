const db = require('../config/db');

class Produto {
    
    // --- O ERRO ESTÁ PROVAVELMENTE AQUI ---
    // A palavra 'static' é OBRIGATÓRIA para chamar Produto.inicializarTabela()
    static async inicializarTabela() {
        const sql = `
            CREATE TABLE IF NOT EXISTS produtos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome VARCHAR(255) NOT NULL,
                descricao VARCHAR(500),
                preco DECIMAL(10, 2) NOT NULL
            )
        `;
        await db.execute(sql);
        console.log('✅ Tabela "produtos" verificada/criada.');
    }

    static async listarTodos() {
        const [rows] = await db.query('SELECT * FROM produtos');
        return rows;
    }
    
    // ... (outros métodos criar, atualizar, deletar também precisam ser static) ...
}

module.exports = Produto; // <--- Garanta que está exportando a classe assim