const express = require('express')
const carritoController = require('../../controllers/carrito.controllers')
//const {Contenedor} = require('../../containers/contenedor')
const router = express.Router()

//const contenedor = new Contenedor("carrito.json")

//const productos = new Contenedor("productos.json")

router.post('/',carritoController.saveCarrito)


router.delete('/:id',carritoController.deleteCarrito)

router.get('/:id/productos',carritoController.getProductosByCarritoId)

router.post('/:id/productos/:id_prod',carritoController.AgregarProducto)


router.delete('/:id/productos/:id_prod',carritoController.deleteProducto)

module.exports = router;