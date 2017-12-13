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
let db = new sqlite3.Database('./db/database.db',
(err) => {
    if (err) {
    return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

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

function registerUser(id, password, callback){
    var sql = 'INSERT INTO user VALUES (?,?,null)';

    db.run(sql, [id,password], function(err) {
        if (err) {
            return callback(1);
        }
        console.log(`A user has been inserted with rowid ${this.lastID}`);
    });
    return callback(null);
}

var SelectCarrinhoDeComprasByCliente = function(cliente,callback) {
    console.log(cliente);
var sql = 'Select * from carrinhoDeCompras WHERE Cliente = ?';
    db.all(sql, [cliente], function(err, rows){
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

var DeleteArtigoFromListaDeDesejo = function(cliente, codArtigo,callback) {
    
var sql = 'Delete from listaDoDesejo WHERE cliente = ? and codArtigo = ?';
    db.run(sql, [cliente,codArtigo], function(err) {
        if (err) {
            return callback("not ok");
        }
    });
    return callback("ok");
};

var DeleteCarrinhoDeComprasByCliente = function(cliente,codArtigo,callback) {
    
var sql = 'Delete from carrinhoDeCompras WHERE Cliente = ? AND CodArtigo = ?';
    db.run(sql, [cliente,codArtigo], function(err) {
        if (err) {
            return callback("not ok");
        }
    });
  return callback("ok");
}

var DeleteAllCarrinhoDeComprasByCliente = function(cliente,callback) {

    var sql = 'Delete from carrinhoDeCompras WHERE Cliente = ?';
    db.run(sql, [cliente], function(err) {
        if (err) {
            return callback("not ok");
        }
    });
    return callback("ok");
}

function getArtigoInfo(codArtigo, callback) {
	var getArtigo = 'SELECT * FROM ArtigoInfo WHERE id = ?';
	db.all(getArtigo, [codArtigo], (err, rows) => {
		if (err) {
			return callback(-1);
		}
		return callback(rows[0]);
	});
}

function updateArtigoInfo(codArtigo, autor, imagem, callback) {
	var getArtigo = 'SELECT id FROM ArtigoInfo WHERE id = ?';
	db.all(getArtigo, [codArtigo], (err, rows) => {
		if (err) {
			return callback(-1);
		}
		if (rows.length !== 1) {
			var sql = 'INSERT INTO ArtigoInfo(id, autor, imagem) VALUES(?,?,?)';
			db.run(sql, [codArtigo, autor, imagem], function(err) {
				if (err) {
					return callback(-2);
				}
				return callback(1);
			});
		} else {
			var sql = 'UPDATE ArtigoInfo SET imagem = ?, autor = ? WHERE id = ?';
			db.run(sql, [imagem, autor, codArtigo], function(err) {
				if (err) {
					return callback(-3);
				}
				return callback(1);
			});
		}
	});
}

function searchArtigos(autor, callback) {
    var getArtigos = "SELECT id FROM ArtigoInfo WHERE autor LIKE '%" + autor + "%';";
    db.all(getArtigos, [], (err, rows) => {
        if (err) {
            return callback(err);
        }
        return callback(rows);
    });
}



// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.post('/deleteDesejo', function(req, res) {
     DeleteArtigoFromListaDeDesejo(req.body.cliente,req.body.codArtigo, function(resp){
        res.send(resp);
     });
});

router.post('/deleteShoppingCart', function(req, res) {
    DeleteCarrinhoDeComprasByCliente(req.query.cliente, req.query.codArtigo, function(resp){
        res.send(resp);
    });
});

router.post('/deleteAllShoppingCart', function(req, res) {
    DeleteAllCarrinhoDeComprasByCliente(req.query.cliente, function(resp){
        res.send(resp);
    });
});

router.post('/atualizarArtigo', function(req, res) {
	var codArtigo = req.body.CodArtigo;
	if (codArtigo === undefined || codArtigo === null) return res.send({message: 0});
	var imagem = req.body.imagem;
	var autor = req.body.autor;
	if(imagem === undefined) imagem = null;
	if(autor === undefined) autor = null;
	updateArtigoInfo(codArtigo, autor, imagem, function(resp){
        res.send({ message: resp });   
    });
});

router.post('/insertInShoppingCart', function(req, res) {
    var cliente = req.body.cliente;
    var codArtigo = req.body.codArtigo;
    var quantity = req.body.qty;

    console.log(cliente);

    InsertInCarrinhoDeCompras(cliente, codArtigo, quantity, function(err){
        if(!err)
            res.send("ok");
    });
});

router.post('/registry', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    registerUser(username, password, function(err){
        if(!err)
            res.send("ok");
    });
});

router.get('/getArtigoInfo', function(req, res) {
	var codArtigo = req.query.id;
	if (codArtigo === undefined || codArtigo === null) return res.send({message: 0});
	getArtigoInfo(codArtigo, function(resp){
		res.send({ message: resp });
	});
});

router.get('/carrinhocompras', function(req, res) {
    SelectCarrinhoDeComprasByCliente(req.query.cliente, function(resp){
        console.log(resp);
        res.send(resp);
    });
});

router.get('/listaDesejo', function(req, res) {
    SelectListaDeDesejoByCliente(req.query.cliente, function(resp){
       res.send(resp);
    });
});


router.post('/addListadoDesejo', function(req, res) {
    InsertInListadeDesejo(req.body.codArtigo, req.body.cliente,function (err) {
        if(!err) {
            res.send("OK");
        }
    })}
);

router.get('/usersByName', function(req, res) {
    SelectUserByUsername(req.query.username, function(resp){
        res.send(resp);
    });
});

router.get('/search', function(req, res) {
    searchArtigos(req.query.autor, function (resp) {
        res.send(resp);
    });
});

var SelectUserByUsername = function(id,callback) {
    console.log(id);
    var sql = 'Select * from user WHERE id = ?';
    db.all(sql, [id], function(err, rows){
        if (err) {
            console.log(not_found);
            return callback(1);
        }
        console.log(found);
        return callback(rows);
    });
};

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