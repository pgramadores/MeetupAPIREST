var mongoose = require('mongoose');
var Objeto  = mongoose.model('esquemaPeliculas');

exports.buscarTodo = function(req, res) {
    Objeto.find(function(err, data) {
        if(err){
            return res.send(500, err.message);
        }
        console.log('GET /data')
        res.status(200).jsonp(data);
    });
};

exports.buscarPorId = function(req, res) {
    Objeto.findById(req.params.id, function(err, data) {
        if(err) {
            return res.send(500,err.message);
        }
        console.log('GET /data/' + req.params.id);
        res.status(200).jsonp(data);
    });
};


exports.agregaPelicula = function(req, res) {
    console.log('POST');
    var datos = new Objeto({
        "categoria":          req.body.categoria,
        "puntuacion":         req.body.puntuacion,
        "pais":               req.body.pais,
        "fechaestreno":       req.body.fechaestreno,
        "estado":             req.body.estado
    });
    datos.save(function(err, datos) {
        if(err){
            return res.status(500).send( err.message);
        }else {
            res.status(200).jsonp(datos);
        }
    });
};

exports.actualizaPelicula = function(req, res) {
    Objeto.findById(req.params.id, function(err, data) {
        data.categoria = req.body.categoria;
        data.puntuacion = req.body.puntuacion;
        data.pais = req.body.pais;
        data.fechaestreno = req.body.fechaestreno;
        data.estado = req.body.estado;

        data.save(function(err) {
            if(err) {
                return res.status(500).send(err.message);
            }else{
                res.status(200).jsonp(data);
            }
        });
    });
};

exports.borraPelicula = function(req, res) {
    Objeto.findById(req.params.id, function(err, data) {
        data.remove(function(err) {
            if(err){
                return res.status(500).send(err.message);
            }else {
                res.status(200).send();
            }
        })
    });
};
