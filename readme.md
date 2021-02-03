# Desafio BackEnd - NodeJS - OW Interactive 2020

## Sobre a OW Interactive

Fazemos parte do universo digital, focada em criar e desenvolver experiências interativas, integrando planejamento, criatividade e tecnologia. Conheça mais sobre nós em: [OW Interactive - Quem somos](http://www.owinteractive.com/quem-somos/).

## Pré-requisitos

- Javascript (ES6+);
- Banco de dados MariaDB, MySQL
- Servidor Nginx
- Conhecimentos sobre REST;
- Conhecimentos de Git.

## Desafio

### Etapa 1 - Cadastro de Usuarios

- Implementar endpoints para cadastro, edição e exclusão de usuarios.
- Implementar endpoint que liste todos os usuarios com possibilidade de busca por palavra chave (buscar no nome ou email)
- Implementar endpoints de login e logout.
- Implementar recuperação de senha por e-mail.

### Etapa 2 - Cadastro de Categorias/Produtos

- Implementar endpoints para cadastro, edição e exclusão de categorias.
- Implementar endpoint para listagem de categorias e os produtos dessas categorias com possibilidade de busca pelo nome da categoria ou de um produto que pertença a ela.
- Implementar endpoints para cadastro, edição e exclusão de produtos.
- Implementar endpoint para listagem de todos os produtos
- Implementar endpoint para adicionar ou remover saldo no estoque do produto
- Todo produto cadastrado precisa obrigatoriamente pertencer a uma categoria.
- Um categoria que possuir produtos não pode ser excluida.

### Etapa 3 - Cadastro/Cancelamento de Vendas

- Implementar endpoints para realizações de pedidos de venda
- Toda venda cadastrada deve subtrair a quantidade comprada do produto em seu estoque
- Implementar endpoint para cancelamento de pedidos de venda
- Ao cancelar um pedido o estoque do produto deve ser devolvido
- Um produto com pedido de venda não pode ser excluido.
- Listar todos os pedidos de venda trazendo todos os produtos e o total da venda com filtro por data de inicio e fim

### Etapa 4 - Autorização de usuários.

- Criar usuarios de dois tipos, Administradores e Clientes.
- Os usuarios Administradores tem acesso a todos os endpoints
- Os usuarios Clientes tem acesso a listagem de produtos e categorias
- Os usuarios Clientes não podem cadastrar, alterar ou excluir categorias e produtos
- Os usuarios Clientes podem fazer e cancelar vendas
- Ao listar as vendas logado como usuario exibir apenas as que foram feitas por ele

### Etapa 5 - Cliente para integração.

- Criar uma aplicação vue para integração dos dados
- Criar uma tela para cadastro, login, cadastro de categoria, de produtos e de venda
- Não é necessário criar um layout especifico pode usar um framework para agilizar (ex: bootstrap)

## Diferencial

- Documentação dos endpoints
- Uso de Query Scopes e Hooks do AdonisJS

## Conclusão

- Usar javascript ES6+
- Usar o AdonisJS (adonisjs.com)
- Validar todos os cadastros (min/max caracteres, tipos string/number, required, etc)

## Conclusão

Crie um fork e submeta ao Github o seu desafio. Após isso envie um e-mail para [letsrock@owinteractive.com](mailto:letsrock@owinteractive.com), com o assunto [DESAFIO BACK-END] com o link para o seu desafio. Obrigado por participar e boa sorte =)

*****************************************************************************

## Observações

## Documentação

A rotas foram documentada pelo insomni,acessando diretamente o arquivo insomnia.json em https://github.com/brunocardosof/desafio-backend-node/blob/master/backend/doc/Insomnia.json com o programa insomnia.

Também acessando o insomnia documenter, na pasta backend/doc, rodar localmente a página da documentação utilizando algum http server, por exemploe, <b>npx serve</b>

## Backend

Configurar o arquivo .env para acessar o banco de dados, enviar email(foi utilizado o mailtrap para testes) e a chave secreta para o JWT

APP_KEY=QFXhUsWeL1RfRqZS9FSC79ydflz8c9Us

DB_CONNECTION=mysql

DB_HOST=127.0.0.1

DB_PORT=3306

DB_USER=root

DB_PASSWORD=

DB_DATABASE=desafio_backend

HASH_DRIVER=bcrypt

MAIL_CONNECTION=smtp

SMTP_PORT=?

SMTP_HOST=?

MAIL_USERNAME=?

MAIL_PASSWORD=?

<b> Criar o banco de dados com o nome desafio_backend</b>

<b> Instalar as dependências do projeto, rodar as migrations, seeds e startar o projeto com os comandos a seguir:</b>
```shell
$ npm i
$ adonis migration:run
$ adonis seed
$ adonis serve --dev
```

## Frontend

<b> Instalar as dependências do projeto e startar o projeto com os comandos a seguir:</b>

```shell
$ npm i
$ npm run serve
```
