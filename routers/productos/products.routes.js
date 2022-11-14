const express = require('express')
const  productosController  = require("../../controllers/productos.controllers")
const router = express.Router()


//Routes
router.get('/', productosController.getProductos)

router.get('/:id',productosController.getProductoById)

router.post('/',productosController.saveProducto)

router.put('/:id',productosController.updateProducto)

router.delete('/:id',productosController.deleteProducto)

module.exports = router;