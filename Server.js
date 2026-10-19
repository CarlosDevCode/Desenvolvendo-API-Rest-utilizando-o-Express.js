// importa o express
const express = require('express');

// cria a aplicacao
const app = express();
const PORT = 3000;

// permite ler o corpo das requisicoes em json
app.use(express.json());

// dados iniciais, sem banco de dados
const alunos = [
  { id: 1, nome: 'Ana', curso: 'Computacao' },
  { id: 2, nome: 'Pedro', curso: 'Sistemas de Informacao' },
];

// proximo id a ser usado, comeca em 3 porque ja existem 2 alunos
// so aumenta, entao nunca repete um id mesmo se alguem for excluido
let proximoId = 3;

// confere se o texto existe e nao esta vazio
function textoValido(valor) {
  return typeof valor === 'string' && valor.trim() !== '';
}

// get /alunos: devolve a lista completa
app.get('/alunos', (req, res) => {
  res.status(200).json(alunos);
});

// get /alunos/:id: devolve um aluno especifico
app.get('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const aluno = alunos.find((a) => a.id === id);

  // se nao achou, 404
  if (!aluno) {
    return res.status(404).json({ erro: 'aluno nao encontrado' });
  }

  res.status(200).json(aluno);
});

// post /alunos: cadastra um novo aluno
app.post('/alunos', (req, res) => {
  const { nome, curso } = req.body || {};

  // nome e curso sao obrigatorios, senao 400
  if (!textoValido(nome) || !textoValido(curso)) {
    return res.status(400).json({ erro: 'nome e curso sao obrigatorios' });
  }

  // cria o aluno com o proximo id e ja avanca o contador
  const novoAluno = { id: proximoId++, nome: nome.trim(), curso: curso.trim() };
  alunos.push(novoAluno);

  res.status(201).json(novoAluno);
});

// put /alunos/:id: atualiza nome e curso de um aluno existente
app.put('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const { nome, curso } = req.body || {};

  // primeiro valida os dados, depois procura o aluno
  if (!textoValido(nome) || !textoValido(curso)) {
    return res.status(400).json({ erro: 'nome e curso sao obrigatorios' });
  }

  const aluno = alunos.find((a) => a.id === id);
  if (!aluno) {
    return res.status(404).json({ erro: 'aluno nao encontrado' });
  }

  // altera o objeto direto no array
  aluno.nome = nome.trim();
  aluno.curso = curso.trim();

  res.status(200).json(aluno);
});

// delete /alunos/:id: remove um aluno
app.delete('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const indice = alunos.findIndex((a) => a.id === id);

  if (indice === -1) {
    return res.status(404).json({ erro: 'aluno nao encontrado' });
  }

  // tira o aluno do array
  alunos.splice(indice, 1);

  // 204 nao devolve corpo
  res.status(204).send();
});

// sobe o servidor
app.listen(PORT, () => {
  console.log(`servidor rodando em http://localhost:${PORT}`);
});
