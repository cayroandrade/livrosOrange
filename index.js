const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const mainController = require('./controller/tabelaController');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', mainController.getIndex);

const port = process.env.PORT || 3000;;
const MONGODB_URI = 'mongodb+srv://cayroandrade:MongOdb2800@fiaporange.c1jtvq7.mongodb.net/?retryWrites=true&w=majority&appName=FIAPOrange';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão com o MongoDB:'));
db.once('open', () => {
    console.log('Conectado ao MongoDB');
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


/*
// Rota raiz
app.get('/', (req, res) => {
    res.send('Bem-vindo ao nosso servidor Express!');
});

 */