const knex = require('../conexao');

const listarProdutos = async (req, res) => {

    const { usuario } = req;
    const { categoria } = req.query;

    try {

        const produtos = await knex('produtos').where({usuario_id: usuario.id , categoria});  
         
        let condicao = '';
        const params = [];

        if (categoria) {
            condicao += 'and categoria ilike $2';
            params.push(`%${categoria}%`);
        }

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const obterProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtos = await knex('produtos')
        .where({
            id,
            usuario_id: usuario.id
        });

        if (!produtos) {
            return res.status(404).json('Produto não encontrado');
        }

        return res.status(200).json(produtos);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const cadastrarProduto = async (req, res) => {

    const { usuario } = req;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome) {
        return res.status(404).json('O campo nome é obrigatório');
    }

    if (!estoque) {
        return res.status(404).json('O campo estoque é obrigatório');
    }

    if (!preco) {
        return res.status(404).json('O campo preco é obrigatório');
    }

    if (!descricao) {
        return res.status(404).json('O campo descricao é obrigatório');
    }

    try {

        const produtos = await knex('produtos').insert({
            usuario_id: usuario.id,
            nome,
            estoque,
            preco,
            categoria,
            descricao,
            imagem
        }).returning('*');
               

        if (!produtos[0]) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(200).json(produtos[0]);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const atualizarProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;
    const { nome, estoque, preco, categoria, descricao, imagem } = req.body;

    if (!nome && !estoque && !preco && !categoria && !descricao && !imagem) {
        return res.status(404).json('Informe ao menos um campo para atualizaçao do produto');
    }

    try {
        const produtos = await knex('produtos')
        .where({
            id,
            usuario_id: usuario.id
        });

        
        if (!produtos.length) {
            return res.status(404).json('Produto não encontrado');
        }

        const produtoAtualizado = await knex('produtos')
        .where({
            id,
            usuario_id: usuario.id
        }).update({
            nome,
            estoque,
            preco,
            categoria,
            descricao,
            imagem
        });
        
        console.log(produtoAtualizado);

        if (!produtoAtualizado) {
            return res.status(400).json("O produto não foi atualizado");
        }

        return res.status(200).json('produto foi atualizado com sucesso.');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const excluirProduto = async (req, res) => {
    const { usuario } = req;
    const { id } = req.params;

    try {
        const produtos = await knex('produtos')
        .where({
            id,
            usuario_id: usuario.id
        });

        if (!produtos) {
            return res.status(404).json('Produto não encontrado');
        }

        const produtoExcluido = await knex('produtos')
        .where({
            id,
            usuario_id: usuario.id
        }).del();

        if (!produtoExcluido) {
            return res.status(400).json("O produto não foi excluido");
        }

        return res.status(200).json('Produto excluido com sucesso');
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    listarProdutos,
    obterProduto,
    cadastrarProduto,
    atualizarProduto,
    excluirProduto
}