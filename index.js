const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

const MONGODB_URI = 'mongodb://localhost:27017/livrosOrange';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Defina o esquema do seu modelo MongoDB para "Stock"
const Schema = mongoose.Schema;
const stockSchema = new Schema({
    Nome: String,
    Autor: String,
    Editora: String,
});

const StockModel = mongoose.model('Stock', stockSchema);


// Rota para criar um novo registro de analise
app.post('/novolivro', async (req, res) => {
    try {
        const {
            Nome,
            Autor,
            Editora
        } = req.body;

        const novoLivro = new StockModel({
            Nome,
            Autor,
            Editora
        });

        await novoLivro.save();
        res.json({ mensagem: 'Registro de analise criado com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao criar novolivro'});
    }
});


// Rota para ler todos os registros de analise
app.get('/consulta', async (req, res) => {
    try {
        const consultaLivros = await StockModel.find();
        res.json(consultaLivros);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar registros de analise' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
