# CoffeeTech - API de Gestão de Produtos (MVC)

Este projeto consiste em uma API RESTful desenvolvida em Node.js para o gerenciamento de produtos. A aplicação segue rigorosamente o padrão de arquitetura **MVC (Model-View-Controller)**, garantindo a separação de responsabilidades, escalabilidade e facilidade de manutenção.

O sistema permite a realização de operações CRUD (Create, Read, Update, Delete) integradas a um banco de dados MySQL.

## 🛠 Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript server-side.
* **Express**: Framework web para gerenciamento de rotas e middlewares.
* **MySQL2**: Driver de conexão com o banco de dados MySQL (suporte a Promises).
* **Dotenv**: Gerenciamento de variáveis de ambiente e segurança de credenciais.
* **HTML/CSS**: Interface de usuário servida estaticamente via Express.

## 📂 Arquitetura do Projeto

A estrutura de pastas foi organizada para refletir a separação de conceitos do padrão MVC:

```text
/CoffeeTech
│
├── /config
│   └── db.js               # Configuração e conexão (Pool) com o MySQL
│
├── /controllers
│   └── ProdutoController.js # Lógica de negócios e orquestração (Controller)
│
├── /models
│   └── produto.js          # Acesso a dados e queries SQL (Model)
│
├── /routes
│   └── produtoRoutes.js    # Definição dos endpoints da API
│
├── /public
│   ├── index.html          # Interface de listagem (View Client-side)
│   └── admin.html          # Interface administrativa (View Client-side)
│
├── .env                    # Variáveis de ambiente (Configurações sensíveis)
└── server.js               # Ponto de entrada da aplicação
🚀 Como Executar o ProjetoPré-requisitosNode.js (v14+)MySQL instalado e rodando.Passo 1: InstalaçãoClone este repositório e instale as dependências listadas no package.json:Bashgit clone [https://github.com/seu-usuario/CoffeeTech.git](https://github.com/seu-usuario/CoffeeTech.git)
cd CoffeeTech
npm install
Passo 2: Configuração do Banco de DadosCrie um arquivo chamado .env na raiz do projeto e defina as credenciais do seu banco de dados local:Ini, TOMLMYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha
MYSQL_NAME=coffee_tech_db
Nota: Certifique-se de criar o banco de dados (CREATE DATABASE coffee_tech_db;) no seu MySQL antes de iniciar. A tabela produtos será criada automaticamente pela aplicação.Passo 3: InicializaçãoInicie o servidor de desenvolvimento:Bashnode server.js
O servidor estará disponível em: http://localhost:3000🔌 Documentação da APIAbaixo estão listados os endpoints disponíveis para consumo:MétodoEndpointDescriçãoExemplo de Body (JSON)GET/produtosRetorna a lista de todos os produtos.N/AGET/produtos/:idRetorna os detalhes de um único produto.N/APOST/produtosCadastra um novo produto.{ "nome": "Café Expresso", "descricao": "Grãos selecionados", "preco": 15.90 }PUT/produtos/:idAtualiza os dados de um produto existente.{ "nome": "Café Expresso", "descricao": "Grãos Premium", "preco": 18.00 }DELETE/produtos/:idRemove um produto do banco de dados.N/A📝 LicençaEste projeto está sob a licença MIT. Sinta-se livre para usar e modificar.