// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

const sqlite3 = require('sqlite3').verbose();


// configuration ===========================================
	
var port = process.env.PORT || 8080; // set our port
// mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// slqite db ==============================================
let db = new sqlite3.Database('./db/database.db');

var InsertInListadeDesejo = function(codArtigo,cliente,callback) {
    
var sql = 'INSERT INTO listaDoDesejo VALUES ( ?, ?)';
    db.run(sql, [codArtigo,cliente], function(err) {
        if (err) {
            return callback(1);
        }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  return callback(null);
}


var InsertInCarrinhoDeCompras = function(cliente,codArtigo,quantidade,callback) {
    
var sql = 'INSERT INTO carrinhoDeCompras VALUES (?,?,?)';
    db.run(sql, [cliente,codArtigo,quantidade], function(err) {
        if (err) {
            return callback(1);
        }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
  return callback(null);
}

var SelectCarrinhoDeComprasByCliente = function(cliente,callback) {
    console.log(cliente);
var sql = 'Select * from carrinhoDeCompras WHERE Cliente = ?';
    db.all(sql, [cliente], (err, rows) => {
        if (err) {
            return callback(1);
        }
        return callback(rows);
    });
}

var SelectListaDeDesejoByCliente = function(cliente,callback) {
    
var sql = 'Select * from listaDoDesejo WHERE Cliente = ?';
    db.all(sql, [cliente], (err, rows) => {
        if (err) {
            return callback(1);
        }
        return callback(rows);
    });
}

var DeleteArtigoFromListaDeDesejo = function(cliente,callback) {
    
var sql = 'Delete from listaDoDesejo WHERE cliente = ?';
    db.run(sql, [cliente], function(err) {
        if (err) {
            return callback(1);
        }
    });
  return callback(null);
}

var DeleteCarrinhoDeComprasByCliente = function(cliente,codArtigo,quantidade,callback) {
    
var sql = 'Delete from carrinhoDeCompras WHERE Cliente = ? AND CodArtigo = ?';
    db.run(sql, [cliente,codArtigo], function(err) {
        if (err) {
            return callback(1);
        }
    });
  return callback(null);
}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/deleteDesejo', function(req, res) {
     DeleteArtigoFromListaDeDesejo(req.query.cliente, function(resp){
        res.json({ message: resp });   
     });
});

router.get('/carrinhocompras', function(req, res) {
    SelectCarrinhoDeComprasByCliente(req.query.cliente, function(resp){
       res.json({resp});   
    });
});

router.get('/listaDesejo', function(req, res) {
    SelectListaDeDesejoByCliente(req.query.cliente, function(resp){
       res.json({resp});   
    });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app