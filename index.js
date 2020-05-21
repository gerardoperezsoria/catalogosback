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
  username: 'root',
  password: '',
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
  }
});


const Productosxcliente = sequelize.define('productosxcliente', {
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
  clavecliente: {
    type: Sequelize.STRING
  }
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

const CatalogoXC = sequelize.define('catalogoxc', {
  status: {
    type: Sequelize.CHAR(1)
  },
  idcatalogo: {
    type: Sequelize.STRING
  },
  clavecliente: {
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

CatalogoXC.sync()
.then(() => console.log('Oh yeah! User table CatalogoXC created successfully'))
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


const createCatalogoXC = async ({ status, idcatalogo, clavecliente }) => {
  return await CatalogoXC.create({ status, idcatalogo, clavecliente });
};

const createPrecios = async ({ status, pagina, pasillo, marca, idproducto, corrida, colores, corte, forro, plantilla, claves, sug_c, precio, modelo, fechas_observaciones, idcatalogo }) => {
  return await Precios.create({ status, pagina, pasillo, marca, idproducto, corrida, colores, corte, forro, plantilla, claves, sug_c, precio, modelo, fechas_observaciones, idcatalogo });
};

const createCatalogos = async ({ status, idcatalogo, nombre, fotos }) => {
  return await Catalogos.create({ status, idcatalogo, nombre, fotos });
};
const createConfiguracionprecios = async ({ status, precioamigos, preciocredito, preciocontado, clavecliente }) => {
  return await Configuracionprecios.create({ status, precioamigos, preciocredito, preciocontado, clavecliente });
};
// create some helper functions to work on the database
const createProductos = async ({ status, idproducto, idcatalogo, categoria, subcategoria, fotos }) => {
  return await Productos.create({ status, idproducto, idcatalogo, categoria, subcategoria, fotos });
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
  // return await sequelize.query(`select * from productos pc join precios p on pc.idproducto=p.idproducto where pc.idproducto="${id}" and pc.status=1 and pc.clavecliente="${clavecliente}"`, { type: sequelize.QueryTypes.SELECT })
  return await sequelize.query(`select * from productos pc join precios p on pc.idproducto=p.idproducto where pc.idproducto="${id}" and pc.status=1`, { type: sequelize.QueryTypes.SELECT })
    .then(producto => {
      return producto;
    })
};

const despliegueNuevosArticulos = async () => {
  try {
    let proceso = false;
    var clientes = await Clientes.findAll({
      where: {
        status: 1
      }
    });

    for (let i = 0; i < clientes.length; i++) {
      let contadorXCliente = await contarArticulosPorCliente(clientes[i].clavecliente).then(function (filesSeq) {
        return filesSeq
      });
      if (contadorXCliente[0].conteo === 0) {
        let cliente = clientes[i].clavecliente;
        let resGC = await generarCatalogo(cliente);
        if (resGC) {
          proceso = true;
        } else {
          proceso = true;
        }
      }
      if (contadorXCliente[0].conteo > 0) {
        var data = await articulosSinAgregar().then(function (filesSeq) {
          var files = filesSeq.map(function (fileSeq) {
            var file = fileSeq//.toJSON();
            file['clavecliente'] = clientes[i].clavecliente;
            delete file.id
            return file;
          });
          return files;
        });

        return Productosxcliente.bulkCreate(data).then(() => {
          proceso = true;
          return proceso;
        }).catch((err) => {
          // console.log('failed to create notes');
          proceso = false;
          return proceso;
          console.log(err);
        }).finally(() => {
          // sequelize.close();
        });
      }
    }
    //   console.log("*", proceso, "*");
    //   return proceso;
  } catch (error) {
    console.log("Error", error);
    return proceso;
  }
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
  console.log("data", data)
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

const generarCXCliente = async (clavecliente) => {
  var data = await Catalogos.findAll().then(function (filesSeq) {
    var files = filesSeq.map(function (fileSeq) {
      var file = fileSeq.toJSON();
      file['clavecliente'] = clavecliente;
      delete file.id
      return file;
    });
    return files;
  })
console.log("data", data);
  return CatalogoXC.bulkCreate(data).then(() => {
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

const actualizaPrecio = async (idproducto, precio) => {
  return await sequelize.query(`update precios set precio=${precio} where idproducto="${idproducto}" and status=1`, { type: sequelize.QueryTypes.SELECT })
    .then(precios => {
      // We don't need spread here, since only the results will be returned for select queries
      return precios;
    })
}

const actualizaProducto = async (idproducto, id) => {
  return await sequelize.query(`update productos set idproducto=${idproducto} where id="${id}" and status=1`, { type: sequelize.QueryTypes.SELECT })
    .then(precios => {
      // We don't need spread here, since only the results will be returned for select queries
      return precios;
    })
}

const getAllProductos = async () => {
  return await sequelize.query(`select id,preciobase,(preciocliente+(preciocliente*(select preciocredito from configuracionprecios where clavecliente="c35f")/100)) as preciocliente,clavecliente,status
  ,fotos,idproducto,catalogo,categoria  from productos`, { type: sequelize.QueryTypes.SELECT })
    .then(users => {
      // We don't need spread here, since only the results will be returned for select queries
      return users;
    })

};

const articulosSinAgregar = async (clavecliente) => {
  // let articulos = await sequelize.query(`select * from productosxclientes pc where not exists (select *from productos p where p.idproducto=pc.idproducto)`, { type: sequelize.QueryTypes.SELECT })
  let articulos = await sequelize.query(`select * from productos where idproducto NOT IN(select idproducto from productosxclientes pc where clavecliente="${clavecliente}" and status=1)`, { type: sequelize.QueryTypes.SELECT })
    .then(articulo => {
      return articulo;
    });
  return articulos
};

const contarArticulosPorCliente = async (clavecliente) => {
  let articulos = await sequelize.query(`select count(clavecliente)as conteo from productosxclientes where clavecliente="${clavecliente}"`, { type: sequelize.QueryTypes.SELECT })
    .then(articulo => {
      return articulo;
    });
  return articulos
};


const getProdcutsXCat = async (idcatalogo, clavecliente) => {
  if (clavecliente === "") {
    return await sequelize.query(`select * from productos pc join precios p on pc.idproducto=p.idproducto where pc.idcatalogo="${idcatalogo}"`, { type: sequelize.QueryTypes.SELECT })
      .then(users => {
        return users;
      })
  } else {
    // return await sequelize.query(`select pc.id, (p.precio+(p.precio*(select preciocredito from configuracionprecios where clavecliente="${clavecliente}")/100)) 
    // as preciocliente,pc.fotos,pc.idproducto from productosxclientes pc join precios p on pc.idproducto=p.idproducto where pc.idcatalogo=
    // "${idcatalogo}" and pc.clavecliente="${clavecliente}"`, { type: sequelize.QueryTypes.SELECT })
    //   .then(users => {
    //     return users;
    //   })
    return await sequelize.query(`select pc.id, (p.precio+(p.precio*(select preciocredito from configuracionprecios where clavecliente="${clavecliente}")/100)) as preciocliente,pc.fotos,pc.idproducto from productos pc join precios p on pc.idproducto=p.idproducto join catalogoxcs cx on cx.idcatalogo=pc.idcatalogo  where pc.idcatalogo="${idcatalogo}" and cx.clavecliente="${clavecliente}";`, { type: sequelize.QueryTypes.SELECT })
      .then(users => {
        return users;
      })    
  }
};


const getNegocio = async obj => {
  return await Negocios.findOne({
    where: obj,
  });
};

const productosParaclientes = async () => {
  return await Productos.findAll({
    where: { status: 1 },
  });
};

const buscarPrecio = async (idproducto) => {
  var precio = await Precios.findOne({
    where: {
      status: 1,
      idproducto: idproducto
    }
  });

  if (precio === null) {
    return false;
  }

  if (precio !== null) {
    return true;
  }
}

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

const edicionproductos = async (idcatalogo) => {
  let catalogos = await Productosxcliente.findAll({
    where: {
      status: 1,
      idcatalogo: idcatalogo
      // nombre: {
      //   [Op.like]: `%${nombre}%`,
      // }
    }
  });
  return catalogos;
};

const buscarCatalogos = async (nombre) => {
  let catalogos = await Catalogos.findAll({
    where: {
      status: 1,
      // nombre: {
      //   [Op.like]: `%${nombre}%`,
      // }
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

const buscarProductoOne = async (idproducto) => {

  return await sequelize.query(`select * from productos pc join precios p on pc.idproducto=p.idproducto where pc.idproducto="${idproducto}"`, { type: sequelize.QueryTypes.SELECT })
    .then(producto => {
      return producto;
    })
  // return await Productos.findOne({
  //   where: {
  //     // status: 1,
  //     idproducto: idproducto
  //   }
  // });
};

const actualizasP = async (id, statusP) => {
  return await Productos.update({ status: statusP }, {
    where: {
      id: id
    }
  });
  // return await sequelize.query(`update productos set status=${statusP} where id="${id}"`, { type: sequelize.QueryTypes.SELECT })
  //   .then(status => {
  //     return status;
  //   })
}

const consultaprecios = async (clavecliente) => {
  return await Configuracionprecios.findOne({
    where: {
      status: 1,
      clavecliente: clavecliente
    }
    });
}

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
  var cliente = await Clientes.findOne({
    where: {
      status: 1,
      email,
      password
    }
  });

  if (cliente !== null) {
    return cliente;
  } else {
    return false;
  }
};

const validaArticulos = async (idproducto) => {
  let prod = await Productos.findOne({
    where: {
      status: 1,
      idproducto: idproducto
    }
  });

  if (prod !== null) {
    return true;
  } else {
    return false;
  }
};

app.post('/micarrito', function (req, res) {
  let { clavecliente, invitado } = req.body
  getCarritos(clavecliente, invitado).then(carrito => res.json(carrito));
});

app.post('/despliegueNuevosArticulos', async function (req, res) {
  let despliegue = await despliegueNuevosArticulos();
  if (despliegue === true) {
    res.json(JSON.stringify({ status: 200, mensaje: "Despliegue exitoso." }))
  }
  if (despliegue === false) {
    res.json(JSON.stringify({ status: 204, mensaje: "Error al realizar el despliegue." }))
  }
});


// get all Products
app.post('/productos', function (req, res) {
  getAllProductos().then(products => res.json(products));
});

//Buscar productos por catalogo
app.post('/porcatalogo', function (req, res) {
  let { idcatalogo, clavecliente } = req.body
  getProdcutsXCat(idcatalogo, clavecliente).then(products => res.json(products));
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
    cb(null, nombre);
  }
});

var upload = multer({ storage: storage })

app.post('/guardararticulos', upload.array('myFiles', 12), async (req, res) => {
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
  const { status = 1, fotos = photosCad, idproducto, categoria, subcategoria, idcatalogo } = form;
  let validaArt = await validaArticulos(idproducto)
  if (validaArt) {
    res.json(JSON.stringify({ status: 204, mensaje: "El articulo ya se encuentra registrado." }))
  } else {
    createProductos({ status, fotos, idproducto, categoria, subcategoria, idcatalogo }).then(user =>
      res.json(JSON.stringify({ status: 200 }))
    );
  }
})

app.post('/registro', (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  var cadenauuid = uuid().split('-');
  var clave = cadenauuid[1];
  /**Tipo de planes prueba 30 dias, vencido, mensual */
  /**Perfiles: 0 = cliente, 1 = invitado, 2 = administrador */
  let preciocredito = 30;
  let preciocontado = 30;
  let precioamigos = 30;
  const { plan = 'prueba', clavecliente = clave, status = 1, email, password, repassword, telefono, cp, calle, numero, rfc, perfil } = form;
  createClientes({ plan, clavecliente, status, email, password, repassword, telefono, cp, calle, numero, rfc, perfil }).then(user => {
    createConfiguracionprecios({ status, preciocredito, preciocontado, precioamigos, clavecliente });
    
    let rescatalogoXC = generarCXCliente(clave);
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

app.post('/login', async (req, res) => {
  let { email, password } = req.body
  let datclient = await validaDatosLogin(email, password).then(cliente => {
    return cliente
  }
  );

  if ((datclient !== null) && datclient !== false) {
    res.json(JSON.stringify({ status: 200, datos: datclient }))
  }
  if (datclient === false) {
    res.json(JSON.stringify({ status: 204, mensaje: "No existe el cliente" }))
  }
})

app.post('/carrito', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  var id = form.idproducto;
  var clave = form.clavecliente;
  var talla = form.talla;
  var producto = await buscarProducto(id, clave);
  if (producto !== null) {
    let preciounitario = producto[0].precio;
    const { status = 1, clavecliente, invitado, ganancia = 0, idproducto = id, cantidad, precio = preciounitario, descripcion=talla, foto } = form;
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

app.post('/edicionproductos', async function (req, res) {
  let dato = req.body.idcatalogo;
  await edicionproductos(dato).then(productos => res.json({ productos: productos }));
});

app.post('/createprecios', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { status = 1, pagina, pasillo, marca, idproducto, corrida, colores, corte, forro, plantilla, claves, sug_c, precio, modelo, fechas_observaciones, idcatalogo } = form;
  let getprecio = await buscarPrecio(idproducto);
  if (getprecio) {
    res.json(JSON.stringify({ status: 204, mensaje: "Ya existe el precio." }))
  } else {
    createPrecios({ status, pagina, pasillo, marca, idproducto, corrida, colores, corte, forro, plantilla, claves, sug_c, precio, modelo, fechas_observaciones, idcatalogo }).then(user =>
      res.json(JSON.stringify({ status: 200 }))
    );
  }
})

app.post('/eliminararticulo', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { clavecliente, invitado, id } = form;

  let eliminar = await Carritos.destroy({
    where: {
      id: id,
      clavecliente: clavecliente,
      invitado: invitado
    }
  });
  if (eliminar === 1) {
    res.json(JSON.stringify({ status: 200 }))
  } else {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/eliminardepedido', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { clavecliente, id } = form;

  let eliminar = await Pedidos.destroy({
    where: {
      id: id,
      clavecliente: clavecliente
    }
  });
  if (eliminar === 1) {
    res.json(JSON.stringify({ status: 200 }))
  } else {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/actualizarproducto', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { idproducto, precio, id } = form;

  let actualizar = await actualizaProducto(idproducto, id);
  if (actualizar === 1) {
    res.json(JSON.stringify({ status: 200 }))
  } else {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/actualizarprecio', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { idproducto, precio, id } = form;

  let actualizar = await actualizaPrecio(idproducto, precio);
  if (actualizar === 1) {
    res.json(JSON.stringify({ status: 200 }))
  } else {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/buscarproducto', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { idproducto } = form;

  let actualizar = await buscarProductoOne(idproducto);
  if (actualizar !== null) {
    res.json(JSON.stringify({ status: 200, data: actualizar }))
  } else {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/cambioEstatusProducto', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { id, valorstatus } = form;
  let actualizar = await actualizasP(id, valorstatus);
  if (actualizar === [1]) {
    res.json(JSON.stringify({ status: 200, data: actualizar }))
  }
  if (actualizar === [0]) {
    res.json(JSON.stringify({ status: 204 }))
  }
});

app.post('/consultaprecios', async (req, res) => {
  const form = JSON.parse(JSON.stringify(req.body))
  const { clavecliente } = form;
  let actualizar = await consultaprecios(clavecliente);
  if (actualizar === null) {
    res.json(JSON.stringify({ status: 204, mensaje: "Sin datos" }))
  }
  if (actualizar !== null) {
    res.json(JSON.stringify({ status: 200, data: actualizar }))
  }
});

app.get('/consultaproductos/:page', async (req, res) => {
  let perPage = 9;
  let page = req.params.page || 1;
  let rows = perPage * page;
  
  let data =  await sequelize.query(`select * from productos p join precios pc on pc.idproducto=p.idproducto where p.status=1 and pc.status=1 limit ${rows};`, { type: sequelize.QueryTypes.SELECT })
  .then(producto => {
    return producto;
  })

  if (data === null) {
    res.json(JSON.stringify({ status: 204, mensaje: "Sin datos" }))
  }
  if (data !== null) {
    res.json(JSON.stringify({ status: 200, data: data }))
  }
});

app.use('/static', express.static(__dirname + '/public/uploads'));
