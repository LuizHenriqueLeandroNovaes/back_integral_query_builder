const express = require('express');
const { login } = require('./controladores/login');
const { listarProdutos, obterProduto, cadastrarProduto, atualizarProduto, excluirProduto } = require('./controladores/produtos');
const { cadastrarUsuario, obterPerfil, atualizarPerfil } = require('./controladores/usuarios');
const verificaLogin = require('./filtros/verificaLogin');

const rotas = express();

// cadastro de usuario
rotas.post('/usuarios', cadastrarUsuario);

// login
rotas.post('/login', login);

// filtro para verificar usuario logado
rotas.use(verificaLogin);

// obter e atualizar perfil do usuario logado
rotas.get('/perfil', obterPerfil);
rotas.put('/perfil', atualizarPerfil);

// crud de produtos
rotas.post('/produtos', cadastrarProduto);
rotas.get('/produtos',listarProdutos);
rotas.get('/produtos/:id', obterProduto);
rotas.put('/produtos/:id', atualizarProduto);
rotas.delete('/produtos/:id', excluirProduto);

module.exports = rotas;