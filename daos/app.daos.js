const envConfig = require("../config");

let ProductosDao;
let CarritoDao;

switch(envConfig.DATASOURCE){
    case 'mongo':
        ProductosDao = require('./productos/productos.mongo.dao')
        CarritoDao = require('./carrito/carrito.mongo.dao')
        break;
    
    case 'firebase':
        ProductosDao= require('./productos/productos.firebase.dao')
        CarritoDao = require('./carrito/carrito.firebase.dao')
        break;
    default:
        throw new Error("Invalid Datasource")
}

module.exports ={
    ProductosDao,
    CarritoDao
}
