const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

//Cluster
//const MONGODB_URI = 'mongodb+srv://cayroandrade:MongOdb2800@fiaporange.c1jtvq7.mongodb.net/?retryWrites=true&w=majority&appName=FIAPOrange/livrosOrange';

//local
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

// Rota para ler todos os livros cadastrados
app.get('/consulta', async (req, res) => {
    try {
        const consultaLivros = await StockModel.find();
        res.json(consultaLivros);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar registros de analise' });
    }
});

// Rota para buscar um livro por id
app.get('/consulta/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const consultaId = await StockModel.findById(id);

        if (!consultaId) {
            return res.status(404).json({ mensagem: 'Item de analise não encontrado' });
        }

        res.json(consultaId);
    } catch (error) {
        res.status(500).json({ erro: 'Erro ao buscar registros de analise por ID' });
    }
});


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

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
