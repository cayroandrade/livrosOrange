const express = require('express');
const path = require('path');
const mainController = require('./controller/tabelaController');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', mainController.getIndex);

const port = 3000;

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