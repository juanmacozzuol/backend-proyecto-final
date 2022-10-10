const express = require('express')
const productosRoutes = require('./productos/products.routes')
const carritoRoutes = require('./carrito/carrito.routes')
const router = express.Router()

router.use('/productos',productosRoutes)
router.use('/carrito',carritoRoutes)

router.use('*', (req, res) => {
    const error_response = { error : -2, descripction: `La ruta '${req.baseUrl}' método ${req.method} no se encuentra implementada.` };
    res.status(404).send( error_response );
})
module.exports = router;