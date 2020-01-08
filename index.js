var express = require('express')
var app = express()
var cors = require('cors');
const multer = require('multer');
const path = require('path');
const uuid = require('uuid');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false
}));

const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: 'catalogos',
  username: 'carrery',
  password: '!A1c3e5g7',
  dialect: 'mysql',
});
// check the databse connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const Op = Sequelize.Op;

const Carritos = sequelize.define('carritos', {
  status: {
    type: Sequelize.CHAR(1)
  },
  clavecliente: {
    type: Sequelize.STRING
  },
  invitado: {
    type: Sequelize.STRING
  },
  ganancia: {
    type: Sequelize.DOUBLE(16, 2)
  },
  idproducto: {
    type: Sequelize.STRING
  },
  cantidad: {
    type: Sequelize.INTEGER
  },
  precio: {
    type: Sequelize.DOUBLE(16, 2)
  },
  descripcion: {
    type: Sequelize.STRING
  },
});

const Pedidos = sequelize.define('pedidos', {
  status: {
    type: Sequelize.CHAR(1)
  },
  clavecliente: {
    type: Sequelize.STRING
  },
  invitado: {
    type: Sequelize.STRING
  },
  ganancia: {
    type: Sequelize.DOUBLE(16, 2)
  },
  idproducto: {
    type: Sequelize.STRING
  },
  cantidad: {
    type: Sequelize.INTEGER
  },
  precio: {
    type: Sequelize.DOUBLE(16, 2)
  },
  descripcion: {
    type: Sequelize.STRING
  },
});


const Productos = sequelize.define('productos', {
  preciobase: {
    type: Sequelize.DECIMAL(16, 2),
  },
  preciocliente: {
    type: Sequelize.DECIMAL(16, 2),
  },
  clavecliente: {
    type: Sequelize.STRING
  },
  status: {
    type: Sequelize.INTEGER
  },
  fotos: {
    type: Sequelize.STRING
  },
  idproducto: {
    type: Sequelize.STRING
  },
  catalogo: {
    type: Sequelize.STRING
  },
  categoria: {
    type: Sequelize.STRING
  },
});

const Clientes = sequelize.define('clientes', {
  status: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  repassword: {
    type: Sequelize.STRING
  },
  telefono: {
    type: Sequelize.CHAR(10)
  },
  cp: {
    type: Sequelize.CHAR(5)
  },
  calle: {
    type: Sequelize.STRING
  },
  numero: {
    type: Sequelize.STRING
  },
  rfc: {
    type: Sequelize.STRING
  },
  plan: {
    type: Sequelize.STRING
  },
  clavecliente: {
    type: Sequelize.STRING
  },
});

const Invitados = sequelize.define('invitados', {
  status: {
    type: Sequelize.CHAR(1)
  },
  telefono: {
    type: Sequelize.CHAR(10)
  },
  clavecliente: {
    type: Sequelize.STRING
  }
});

// create table with user model
Productos.sync()
  .then(() => console.log('Oh yeah! User table Productos created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));
// create table with user model
Clientes.sync()
  .then(() => console.log('Oh yeah! User table Clientes created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

Invitados.sync()
  .then(() => console.log('Oh yeah! User table Invitados created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

Carritos.sync()
  .then(() => console.log('Oh yeah! User table Carritos created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

Pedidos.sync()
  .then(() => console.log('Oh yeah! User table Pedidos created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));


app.set('json spaces', 2);
//app.use(require('./routes/index'));

// start the app
app.listen(3007, function () {
  console.log('Express is running on port 3007');
});

// create some helper functions to work on the database
const createProductos = async ({ status, clavecliente, preciobase, preciocliente, fotos, idproducto, categoria, catalogo }) => {
  return await Productos.create({ status, clavecliente, preciobase, preciocliente, fotos, idproducto, categoria, catalogo });
};

const createClientes = async ({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc }) => {
  return await Clientes.create({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc });
};

const createInvitados = async ({ status, clavecliente, telefono }) => {
  console.log(status, clavecliente, telefono);
  return await Invitados.create({ status, clavecliente, telefono });
};

const createCarritos = async ({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion }) => {
  return await Carritos.create({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion });
};

const createPedidos = async ({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion }) => {
  return await Carritos.create({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion });
};

const buscarProducto = async (id) => {
  return await Productos.findOne({
    where: {
      status: 1,
      idproducto: id
    }
  });
};

const buscarCarrito = async (clavecliente, invitado) => {
  return await Productos.findAll({
    where: {
      status: 1,
      clavecliente,
      invitado
    }
  });
};

const getAllProductos = async () => {
  return await Productos.findAll({
    where: {
      status: 1
    }
  });
};

const getNegocio = async obj => {
  return await Negocios.findOne({
    where: obj,
  });
};

const buscarPedidos = async (clavecliente) => {
  return await Pedidos.findAll({
    where: {
      status: 1,
      clavecliente
    }
  });
};

const getBuscar = async (palabra) => {
  //return palabra
  return await Negocios.findAll({
    where: {
      status: 1,
      producto: {
        [Op.like]: `%${palabra}%`,
      }
    }
  });
};

const getValidarInvitado = async (clavecliente, invitado) => {
  var cliente = await Clientes.findOne({
    where: {
      status: 1,
      clavecliente: clavecliente
    }
  });

  if (cliente !== null) {
    const status = 1;
    const telefono = invitado;
    createInvitados({ status, clavecliente, telefono })//.then(datos =>
    return cliente;
  } else {
    return cliente;
  }
};


// get all Products
app.post('/productos', function (req, res) {
  getAllProductos().then(products => res.json(products));
});

// Busqueda
app.post('/buscar', function (req, res) {
  let { palabra } = req.body
  getBuscar(palabra).then(products => res.json(products));
});

app.post('/pedidos', function (req, res) {
  let { clavecliente, } = req.body
  buscarPedidos(clavecliente).then(products => res.json(products));
});

var nombres = [];
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'public/uploads'),
  filename: (req, file, cb) => {
    var nombre = uuid() + path.extname(file.originalname).toLocaleLowerCase()
    nombres.push(nombre);
    console.log("nombre", nombre);
    cb(null, nombre);
  }
});

var upload = multer({ storage: storage })

app.post('/guardarproductos', upload.array('myFiles', 12), (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const files = req.files;
  if (!files) {
    const error = new Error('Please choose files')
    error.httpStatusCode = 400
    return next(error)
  }
  var photosCad = "";
  nombres.map((row) => {
    photosCad = `${photosCad}&${row}`
  });
  nombres.length = 0;
  const { status = 1, clavecliente = 0, preciobase, preciocliente, fotos = photosCad, idproducto, categoria, catalogo } = form;
  createProductos({ status, clavecliente, preciobase, preciocliente, fotos, idproducto, categoria, catalogo }).then(user =>
    res.json(JSON.stringify({ status: 200 }))
    //res.send("success")
  );

  //res.send(files)
  //res.json({ "nameImages": photosCad })
})

app.post('/registro', (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  var cadenauuid = uuid().split('-');
  var clave = cadenauuid[1];
  console.log(cadenauuid, '*', clave);
  /**Tipo de planes prueba 30 dias, vencido, mensual */
  const { plan = 'prueba', clavecliente = clave, status = 1, email, password, repassword, telefono, cp, calle, numero, rfc } = form;
  createClientes({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc }).then(user =>
    res.json(JSON.stringify({ status: 200, clave: clave }))
  );
})

app.post('/validarinvitado', (req, res) => {
  // const form = JSON.parse(JSON.stringify(req.body))
  let { clavecliente, telefono } = req.body
  getValidarInvitado(clavecliente, telefono).then(cliente => res.json(cliente));
})

app.post('/carrito', (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  /**Buscar producto por id */
  var id = form.idproducto;
  var producto = buscarProducto(id)
  var ganancianeta = producto.precio * form.cantidad;
  const { status = 1, clavecliente, invitado, ganancia = ganancianeta, idproducto=id, cantidad, precio, descripcion } = form;
  createCarritos({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion }).then(user =>
    res.json(JSON.stringify({ status: 200 }))
  );
})

app.post('/pedido', (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  /**Buscar producto por id */
  var id = form.idproducto;
  var producto = buscarCarrito(clavecliente, invitado)
  const { status = 1, clavecliente, invitado, ganancia = ganancianeta, idproducto, cantidad, precio, descripcion } = form;
  createPedidos({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion }).then(user =>
    res.json(JSON.stringify({ status: 200 }))
  );
})

app.use('/static', express.static(__dirname + '/public/uploads'));
