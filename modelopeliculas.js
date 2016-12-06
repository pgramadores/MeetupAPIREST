var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var peli = new Schema({
    categoria:      { type: String, enum:['Suspenso','Accion','Romantica','Terror','Anime']},
    puntuacion:     { type: Number },
    pais:           { type: String },
    fechaestreno:   { type: Date },
    estado:         { type: Boolean },
});

module.exports = mongoose.model('esquemaPeliculas', peli);
