const express = require ('express')
const apiRoutes = require('./routers/app.routers')


const app = express()
const PORT = process.env.port || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',apiRoutes)
app.use('*', (req, res) => {
    const error_response = { error : -2, descripction: `La ruta '${req.baseUrl}' método ${req.method} no se encuentra implementada.` };
    res.status(404).send( error_response );
})

const server = app.listen(PORT,() => {
    console.log(`Servidor activo y escuchando en el puerto ${server.address().port}`)
})

server.on('error',(error)=> console.log(`se registró el siguiente error: ${error.message}`))