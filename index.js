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
  foto: {
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
  idpedido: {
    type: Sequelize.CHAR(4)
  }
});

const Productos = sequelize.define('productos', {
  status: {
    type: Sequelize.CHAR(1)
  },
  idproducto: {
    type: Sequelize.STRING
  },
  idcatalogo: {
    type: Sequelize.STRING
  },
  categoria: {
    type: Sequelize.STRING
  },
  subcategoria: {
    type: Sequelize.STRING
  },
  fotos: {
    type: Sequelize.STRING
  },
  
  
  
  // preciobase: {
  //   type: Sequelize.DECIMAL(16, 2),
  // },
  // preciocliente: {
  //   type: Sequelize.DECIMAL(16, 2),
  // },
  // clavecliente: {
  //   type: Sequelize.STRING
  // },
  // status: {
  //   type: Sequelize.INTEGER
  // },
  // fotos: {
  //   type: Sequelize.STRING
  // },
  // idproducto: {
  //   type: Sequelize.STRING
  // },
  // catalogo: {
  //   type: Sequelize.STRING
  // },
  // categoria: {
  //   type: Sequelize.STRING
  // },
});


const Productosxcliente = sequelize.define('productosxcliente', {
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
  perfil: {
    type: Sequelize.CHAR(1)
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

const Precios = sequelize.define('precios', {
  status: {
    type: Sequelize.CHAR(1)
  },
  pagina: {
    type: Sequelize.INTEGER
  },
  pasillo: {
    type: Sequelize.STRING
  },
  marca: {
    type: Sequelize.STRING
  },
  idproducto: {
    type: Sequelize.STRING
  },
  corrida: {
    type: Sequelize.STRING
  },
  colores: {
    type: Sequelize.STRING
  },
  corte: {
    type: Sequelize.STRING
  },
  forro: {
    type: Sequelize.STRING
  },
  plantilla: {
    type: Sequelize.STRING
  },
  claves: {
    type: Sequelize.STRING
  },
  sug_c: {
    type: Sequelize.STRING
  },
  precio: {
    type: Sequelize.STRING
  },
  modelo: {
    type: Sequelize.STRING
  },
  fechas_observaciones: {
    type: Sequelize.STRING
  },
  idcatalogo: {
    type: Sequelize.STRING
  },

});

const Configuracionprecios = sequelize.define('configuracionprecios', {
  status: {
    type: Sequelize.CHAR(1)
  },
  precioamigos: {
    type: Sequelize.DOUBLE(16, 2)
  },
  preciocredito: {
    type: Sequelize.DOUBLE(16, 2)
  },
  preciocontado: {
    type: Sequelize.DOUBLE(16, 2)
  },
  clavecliente: {
    type: Sequelize.STRING
  },
});


const Catalogos = sequelize.define('catalogos', {
  status: {
    type: Sequelize.CHAR(1)
  },
  idcatalogo: {
    type: Sequelize.STRING
  },
  nombre: {
    type: Sequelize.STRING
  },
  fotos: {
    type: Sequelize.STRING
  }
});


Catalogos.sync()
  .then(() => console.log('Oh yeah! User table Catalogos created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));
Precios.sync()
  .then(() => console.log('Oh yeah! User table Precios created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));
Configuracionprecios.sync()
  .then(() => console.log('Oh yeah! User table Configuracionprecios created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));
// create table with user model
Productos.sync()
  .then(() => console.log('Oh yeah! User table Productos created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));
Productosxcliente.sync()
  .then(() => console.log('Oh yeah! User table Productosxcliente created successfully'))
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

const getCarritos = async (clavecliente, invitado) => {
  return await Carritos.findAll({
    where: {
      status: 1,
      clavecliente: clavecliente,
      invitado: invitado
    }
  });
};


const createCatalogos = async ({ status, idcatalogo, nombre, fotos }) => {
  return await Catalogos.create({ status, idcatalogo, nombre, fotos });
};
const createConfiguracionprecios = async ({ status, precioamigos, preciocredito, preciocontado, clavecliente }) => {
  return await Configuracionprecios.create({ status, precioamigos, preciocredito, preciocontado, clavecliente });
};
// create some helper functions to work on the database
const createProductos = async ({ status,idproducto,idcatalogo,categoria,subcategoria, fotos }) => {
  return await Productos.create({ status,idproducto,idcatalogo,categoria,subcategoria, fotos });
};

const createClientes = async ({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc, perfil }) => {
  return await Clientes.create({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc, perfil });
};

const createInvitados = async ({ status, clavecliente, telefono }) => {
  return await Invitados.create({ status, clavecliente, telefono });
};

const createCarritos = async ({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion, foto }) => {
  return await Carritos.create({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion, foto });
};

const buscarProducto = async (id, clavecliente) => {
  return await Productosxcliente.findOne({
    where: {
      status: 1,
      idproducto: id,
      clavecliente: clavecliente
    }
  });
};

const generarCatalogo = async (clavecliente) => {
  var data = await Productos.findAll().then(function (filesSeq) {
    var files = filesSeq.map(function (fileSeq) {
      var file = fileSeq.toJSON();
      file['clavecliente'] = clavecliente;
      delete file.id
      return file;
    });
    return files;
  })
  return Productosxcliente.bulkCreate(data).then(() => {
    return true;
  }).catch((err) => {
    // console.log('failed to create notes');
    return false;
    console.log(err);
  }).finally(() => {
    // sequelize.close();
  });
};

const buscarCarrito = async (clavecliente, invitado) => {
  var data = await Carritos.findAll({
    where: { status: 1, clavecliente: clavecliente, invitado: invitado }
  }).then(function (filesSeq) {
    let cadenauuid = uuid().split('-');
    let clave = cadenauuid[1];
    var files = filesSeq.map(function (fileSeq) {
      var file = fileSeq.toJSON();
      file['idpedido'] = clave;
      delete file.id
      return file;
    });
    return files;
  })
  return Pedidos.bulkCreate(data).then(() => {
    Carritos.destroy({
      where: {
        clavecliente: clavecliente, invitado: invitado
      }
    });
    return true;
  }).catch((err) => {
    // console.log('failed to create notes');
    return false;
    console.log(err);
  }).finally(() => {
    // sequelize.close();
  });
};

const getAllProductos = async () => {
  // return await Productos.findAll({
  //   where: {
  //     status: 1
  //   }
  // });

  return await sequelize.query(`select id,preciobase,(preciocliente+(preciocliente*(select preciocredito from configuracionprecios where clavecliente="c35f")/100)) as preciocliente,clavecliente,status
  ,fotos,idproducto,catalogo,categoria  from productos`, { type: sequelize.QueryTypes.SELECT })
    .then(users => {
      // We don't need spread here, since only the results will be returned for select queries
      return users;
    })

};

const getNegocio = async obj => {
  return await Negocios.findOne({
    where: obj,
  });
};

const upsert = async (credito, contado, amigos, clavecliente) => {
  var cliente = await Configuracionprecios.findOne({
    where: {
      status: 1,
      clavecliente: clavecliente
    }
  });

  if (cliente === null) {
    let status = 1;
    let preciocredito = credito;
    let preciocontado = contado;
    let precioamigos = amigos;
    let cliente = clavecliente;
    createConfiguracionprecios({ status, preciocredito, preciocontado, precioamigos, clavecliente })//.then(datos =>
    return cliente;
  }

  if (cliente !== null) {
    Configuracionprecios.update(
      {
        preciocredito: credito, preciocontado: contado, precioamigos: amigos
      },
      {
        where: {
          clavecliente: clavecliente
        }
      });
    return cliente;
  }
  return cliente;
}

const buscarCatalogos = async (nombre) => {
  let catalogos = await Catalogos.findAll({
    where: {
      status: 1,
      nombre: {
        [Op.like]: `%${nombre}%`,
      }
    }
  });
  return catalogos;
};

const buscarPedidos = async (clavecliente) => {
  let pedidos = await Pedidos.findAll({
    // attributes: ['idpedido'],
    where: {
      status: 1,
      clavecliente
    }
    // ,
    // group: ['idpedido']
  });
  return pedidos;
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

const validaDatosLogin = async (email, password) => {
  var cliente = await Registro.findOne({
    where: {
      status: 1,
      email,
      password
    }
  });

  if (cliente !== null) {
    return true;
  } else {
    return false;
  }
};


app.post('/micarrito', function (req, res) {
  let { clavecliente, invitado } = req.body
  getCarritos(clavecliente, invitado).then(carrito => res.json(carrito));
});

// get all Products
app.post('/productos', function (req, res) {
  getAllProductos().then(products => res.json(products));
});

// Busqueda
app.post('/buscar', function (req, res) {
  let { palabra } = req.body
  getBuscar(palabra).then(products => res.json(products));
});

app.post('/pedidos', async function (req, res) {
  let { clavecliente, } = req.body
  await buscarPedidos(clavecliente).then(pedidos => res.json({ pedidos: pedidos }));
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
  /**Tipo de planes prueba 30 dias, vencido, mensual */
  /**Perfiles: 0 = cliente, 1 = invitado, 2 = administrador */
  const { plan = 'prueba', clavecliente = clave, status = 1, email, password, repassword, telefono, cp, calle, numero, rfc, perfil } = form;
  createClientes({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc, perfil }).then(user => {
    let rescatalogo = generarCatalogo(clave);
    if (rescatalogo) {
      res.json(JSON.stringify({ status: 200, clave: clave }))
    } else {
      res.json(JSON.stringify({ status: 200, mensaje: "Error al crear catálogo, intente nuevamente." }))
    }
  }
  );
})

app.post('/validarinvitado', (req, res) => {
  // const form = JSON.parse(JSON.stringify(req.body))
  let { clavecliente, telefono } = req.body
  getValidarInvitado(clavecliente, telefono).then(cliente => res.json(cliente));
})

app.post('/login', (req, res) => {
  let { email, password } = req.body
  validaDatosLogin(email, password).then(cliente =>
    res.json(JSON.stringify({ status: 200, mensaje: cliente }))
  );
})

app.post('/carrito', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  /**Buscar producto por id */
  var id = form.idproducto;
  var clave = form.clavecliente;
  var producto = await buscarProducto(id, clave);
  if (producto !== null) {
    var ganancianeta = producto.preciocliente * form.cantidad;
    const { status = 1, clavecliente, invitado, ganancia = ganancianeta, idproducto = id, cantidad, precio = producto.preciocliente, descripcion, foto } = form;
    createCarritos({ status, clavecliente, invitado, ganancia, idproducto, cantidad, precio, descripcion, foto }).then(user =>
      res.json(JSON.stringify({ status: 200, mensaje: "OK" }))
    );
  } else {
    res.json(JSON.stringify({ status: 200, mensaje: "Producto no existe." }))
  }
})

app.post('/pedido', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  /**Buscar producto por id */
  var clave = form.clavecliente
  var inv = form.invitado;
  var producto = await buscarCarrito(clave, inv)
  if (producto) {
    res.json(JSON.stringify({ status: 200, mensaje: "Pedido creado con exito." }))
  } else {
    res.json(JSON.stringify({ status: 200, mensaje: "Error al crear pedido, intente nuevamente." }))
  }
})

app.post('/configuraprecio', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body));
  const { credito, contado, amigos, clavecliente } = form;
  await upsert(credito, contado, amigos, clavecliente).then(function (result) {
    res.status(200).send({ success: true });
  });
})

app.post('/creacatalogo', upload.array('myFiles', 12), (req, res) => {
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
  let cadenauuid = uuid().split('-');
  let clave = cadenauuid[1];
  const { status = 1, idcatalogo = clave, nombre, fotos = photosCad } = form;
  createCatalogos({ status, idcatalogo, nombre, fotos }).then(user =>
    res.json(JSON.stringify({ status: 200 }))
  );
})

app.post('/buscarcatalogos', async function (req, res) {
  let { nombre } = req.body
  await buscarCatalogos(nombre).then(catalogos => res.json({ catalogos: catalogos }));
});

app.use('/static', express.static(__dirname + '/public/uploads'));
