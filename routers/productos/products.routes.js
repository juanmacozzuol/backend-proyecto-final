const express = require('express')
const {Contenedor} = require('../../contenedor')
const router = express.Router()

const contenedor = new Contenedor('productos.json')

//Routes
router.get('/',async(req,res)=>{

    res.status(200).json(await contenedor.getAll())
})

router.get('/:id',async(req,res)=>{

    const products = await contenedor.getAll()
    if(+req.params.id > products.length )
    {
        res.status(400).json({error:'producto no encontrado'})
    }
    else{
    res.status(200).json(await contenedor.getById(req.params.id))
    }

})

router.post('/',async(req,res)=>{

    const {nombre,descripción,codigo,precio,foto,stock} = req.body
    console.log(req.headers.administrador)
    if(req.headers.administrador == 1){
        const products = await contenedor.getAll()
        
        const  newProduct = { nombre,
                            descripción,
                            codigo,
                            precio,
                            foto,
                            stock,
                            timestamp:new Date(Date.now()).toUTCString(),
                            id:products.length +1
        }
    
        await contenedor.save(newProduct)
        res.status(200).json(newProduct) 
    }
    else{
        const error_response = { error : -1, descripction: `La ruta '${req.baseUrl}' método ${req.method} no autorizada.` };
        res.status(404).send( error_response );
    }
    
})

router.put('/:id',async(req,res)=>{

  
    const {nombre,descripción,codigo,precio,foto,stock}=req.body
    if(req.headers.administrador == 1){
        const products =await contenedor.getAll()
        if(+req.params.id > products.length )
        {
            res.status(400).json({error:'producto no encontrado'})
        }
        else{
            const productIndex = products.findIndex((product) => product.id == parseInt(req.params.id));
        
            const newProduct = {
                ...products[productIndex],
                nombre,
                descripción,
                codigo,
                precio,
                foto,
                stock,
                timestamp:new Date(Date.now()).toUTCString()
            }

            products[productIndex]=newProduct

            contenedor.modifyById(products)
            return res.json({ success: true, result: newProduct});
        }
    }
    else{
        const error_response = { error : -1, descripction: `La ruta '${req.baseUrl}' método ${req.method} no autorizada.` };
        res.status(404).send( error_response );
    }
    
})

router.delete('/:id',async(req,res)=>{
    if(req.headers.administrador == 1){
        const products = await contenedor.getAll()
        if(+req.params.id > products.length )
        {
            res.status(400).json({error:'producto no encontrado'})
        }
        else{
            await contenedor.deleteById(req.params.id)
            return res.json({ success: true, result: 'product correctly eliminated' });
        }
    }
    else{
        const error_response = { error : -1, descripction: `La ruta '${req.baseUrl}' método ${req.method} no autorizada.` };
        res.status(404).send( error_response );
    }
    
})

module.exports = router;