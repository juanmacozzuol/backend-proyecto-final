const express = require('express')
const {Contenedor} = require('../../contenedor')
const router = express.Router()

const contenedor = new Contenedor("carrito.json")

const productos = new Contenedor("productos.json")

router.post('/',async(req,res)=>{
    

    
    const carts = await contenedor.getAll()
    
   const  newCart = { 
                    timestamp:new Date(Date.now()).toUTCString(),
                    id:carts.length +1,
                    productos:[]
                }
   
                await contenedor.save(newCart)
                res.status(200).json(newCart.id) 
})


router.delete('/:id',async(req,res)=>{
    const carts = await contenedor.getAll()
    if(+req.params.id > carts.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
        await contenedor.deleteById(req.params.id)
        return res.json({ success: true, result: 'product correctly eliminated' });
    }
    
    
})

router.get('/:id/productos',async(req,res)=>{
    
    const carts = await contenedor.getAll()

    if(+req.params.id > carts.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{

    const carrito = await contenedor.getById(req.params.id)

    res.status(200).json(carrito.productos)
    }

})

router.post('/:id/productos/:id_prod',async(req,res)=>{
   
    const products = await productos.getAll()
    if(+req.params.id_prod > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
        const product = await productos.getById(req.params.id_prod)
        const carts = await contenedor.getAll()
        const cart = carts.find((cart)=>cart.id ==parseInt(req.params.id))
        cart.productos.push(product)
        const cartIndex = carts.findIndex((product) => product.id == parseInt(req.params.id));
    
        const newCart = {
            ...carts[cartIndex],
            
            
        }
        console.log(newCart)
        carts[cartIndex]=newCart
       
        contenedor.modifyById(carts)
         return res.json({ success: true, result: cart});
    }
   
})


router.delete('/:id/productos/:id_prod',async(req,res)=>{
    const products = await productos.getAll()
    if(+req.params.id_prod > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
        const product = await productos.getById(req.params.id_prod)
        const carts = await contenedor.getAll()
        const cart = carts.find((cart)=>cart.id ==parseInt(req.params.id))
        cart.productos=cart.productos.filter((producto)=>producto.id != parseInt(req.params.id_prod))
        const cartIndex = carts.findIndex((product) => product.id == parseInt(req.params.id));
    
        const newCart = {
            ...carts[cartIndex],
            
            
        }
        console.log(newCart)
        carts[cartIndex]=newCart
       
        contenedor.modifyById(carts)
         return res.json({ success: true, result: cart});
    }
    
    
})

module.exports = router;