const mongoose = require('mongoose');

const livrosSchema = new mongoose.Schema({
    _id: Number,
    nome: String,
    autor: String,
    editora: String,
})

const Livros = new mongoose.model('livros', livrosSchema);
module.exports = { Livros };