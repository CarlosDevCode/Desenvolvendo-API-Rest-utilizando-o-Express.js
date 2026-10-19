# API de Alunos com Express.js

API REST simples para gerenciar alunos de uma instituição de ensino, feita com Node.js e Express.js. Permite cadastrar, consultar, atualizar e excluir alunos.

Atividade 3 da disciplina de Desenvolvimento Web (Back-end), curso de Análise e Desenvolvimento de Sistemas, UEPB.

> Os dados ficam guardados em um array na memória, sem banco de dados. Ao reiniciar o servidor, tudo volta ao estado inicial.

## Tecnologias

- Node.js
- Express.js

## Como rodar

Pré-requisito: ter o [Node.js](https://nodejs.org) instalado.

```bash
# clonar o repositório
git clone <url-do-repositorio>
cd <pasta-do-projeto>

# instalar as dependências
npm install

# iniciar o servidor
node server.js
```

O servidor sobe em `http://localhost:3000`.

> No PowerShell do Windows, se o `npm` for bloqueado, use o Prompt de Comando (cmd) ou rode `npm.cmd install`.

## Modelo de dados

Cada aluno tem três atributos:

| Campo | Tipo   | Descrição                          |
|-------|--------|------------------------------------|
| id    | number | identificador único, gerado pela API |
| nome  | string | nome do aluno                      |
| curso | string | curso do aluno                     |

Dados iniciais:

```json
[
  { "id": 1, "nome": "Ana", "curso": "Computacao" },
  { "id": 2, "nome": "Pedro", "curso": "Sistemas de Informacao" }
]
```

Os ids novos vêm de um contador que só aumenta, então um id excluído nunca é reaproveitado.

## Rotas

| Método | Rota           | Descrição                         | Sucesso | Erros    |
|--------|----------------|-----------------------------------|---------|----------|
| GET    | `/alunos`      | lista todos os alunos             | 200     | -        |
| GET    | `/alunos/:id`  | busca um aluno pelo id            | 200     | 404      |
| POST   | `/alunos`      | cadastra um novo aluno            | 201     | 400      |
| PUT    | `/alunos/:id`  | atualiza nome e curso de um aluno | 200     | 400, 404 |
| DELETE | `/alunos/:id`  | remove um aluno                   | 204     | 404      |

### Regras de validação

- `nome` e `curso` são obrigatórios no `POST` e no `PUT`.
- Campos ausentes, vazios ou só com espaços retornam **400**.
- Aluno inexistente retorna **404**.
- O `DELETE` bem-sucedido retorna **204** sem corpo.

## Exemplos

### Listar alunos

```http
GET /alunos
```

Resposta `200`:

```json
[
  { "id": 1, "nome": "Ana", "curso": "Computacao" },
  { "id": 2, "nome": "Pedro", "curso": "Sistemas de Informacao" }
]
```

### Buscar um aluno

```http
GET /alunos/1
```

Resposta `200`:

```json
{ "id": 1, "nome": "Ana", "curso": "Computacao" }
```

Aluno inexistente (`GET /alunos/99`), resposta `404`:

```json
{ "erro": "aluno nao encontrado" }
```

### Cadastrar um aluno

```http
POST /alunos
Content-Type: application/json

{ "nome": "Joao", "curso": "Analise e Desenvolvimento de Sistemas" }
```

Resposta `201`:

```json
{ "id": 3, "nome": "Joao", "curso": "Analise e Desenvolvimento de Sistemas" }
```

Sem o curso, resposta `400`:

```json
{ "erro": "nome e curso sao obrigatorios" }
```

### Atualizar um aluno

```http
PUT /alunos/3
Content-Type: application/json

{ "nome": "Joao Pedro", "curso": "Computacao" }
```

Resposta `200`:

```json
{ "id": 3, "nome": "Joao Pedro", "curso": "Computacao" }
```

### Excluir um aluno

```http
DELETE /alunos/3
```

Resposta `204`, sem corpo.

## Testes

Os testes foram feitos no Postman, com dados válidos e inválidos, conferindo o conteúdo das respostas e os códigos HTTP. Também foi verificado que as alterações aparecem nas consultas seguintes.

Exemplo de teste via terminal:

```bash
curl http://localhost:3000/alunos
curl -X POST http://localhost:3000/alunos \
  -H "Content-Type: application/json" \
  -d '{"nome":"Joao","curso":"ADS"}'
```

## Autor

Seu nome aqui
