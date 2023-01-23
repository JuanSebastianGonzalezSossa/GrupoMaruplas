const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    celular: {
        type: Number,
        required: true,
        unique: true
    },
    acumulado: {
        type: Number,
        default: 0,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});


module.exports = model('Usuario', UsuarioSchema );

