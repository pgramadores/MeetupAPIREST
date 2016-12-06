var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});


var demo_     = require('./modelopeliculas')(app, mongoose);
var demoCtrl = require('./controladorpeliculas');

// API routes
var demo_ = express.Router();

demo_.get('/', function(req, res) {
    res.send("Bienvenidos a la API de pro-gramadores!");
});

demo_.route('/peliculas')
  .get(demoCtrl.buscarTodo)
  .post(demoCtrl.agregaPelicula);

demo_.route('/peliculas/:id')
  .get(demoCtrl.buscarPorId)
  .put(demoCtrl.actualizaPelicula)
  .delete(demoCtrl.borraPelicula);


mongoose.connect('mongodb://localhost/peliculas', function(err, res) {
    if(err) {
        console.log('ERROR: connecting to Database. ' + err);
    }else {
        console.log('Conectado a mongodb');
    }
});

app.use(demo_);

app.listen(3000, function() {
    console.log("Node server ejecutandose en http://localhost:3000");
});
