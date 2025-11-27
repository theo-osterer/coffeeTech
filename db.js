const mysql = require('mysql2/promise');
require('dotenv').config();
// BUG 8: O arquivo .env não está sendo lido. Falta uma biblioteca aqui.

const connectDB = async () => {
  try {
    // BUG 9: Os nomes das variáveis (process.env.XXX) não batem com o arquivo .env
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST, 
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    });

    console.log('🔌 MySQL Conectado com Sucesso!');
    return connection;

  } catch (error) {
    console.error('Erro ao conectar ao MySQL:', error.message);
    process.exit(1);
  }
};

// BUG 10: Estamos exportando um objeto {}, mas o server.js espera uma função direta.
module.exports = connectDB;