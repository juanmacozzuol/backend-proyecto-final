const { CarritoDao } = require("../daos/app.daos");
const { ProductosDao } = require("../daos/app.daos");

const productosDao = new ProductosDao()
const carritoDao = new CarritoDao()

class CarritoController{

    
   async getProductosByCarritoId(req,res,next){
      const { id } = req.params;
    try {
      const productos = await carritoDao.getById(id)
     
      res.status(200).json(productos.productos);
    }
    catch(error) {
      next(error);
    }
   } 

   async saveCarrito(req, res, next) {
      try {
        const newCarrito = await carritoDao.save(req.body);
        res.status(200).json(newCarrito);
      }
      catch(error) {
        next(error);
      }
    }

   async AgregarProducto(req, res, next) {
   const { id, id_prod } = req.params;
   
   try {
      const carrito = await carritoDao.getById(id);
      const producto = await productosDao.getById(id_prod);

      carrito.productos.push(producto)

      const updateCarrito = await carritoDao.update(id,carrito)

      res.status(200).json(updateCarrito);
   }
   catch(error) {
      next(error);
   }
   }

   async deleteCarrito(req, res, next) {
      const { id } = req.params;
      try {
        const deletedCarrito = await carritoDao.deleteById(id);
       
        res.status(200).json(deletedCarrito);
      }
      catch(error) {
        next(error);
      }
    }

    async deleteProducto(req, res, next) {
        const { id,id_prod } = req.params;
        try {
          const carrito = await carritoDao.getById(id);
          let productos = carrito.productos

          let nuevosProductos =productos.filter(producto=>producto._id.valueOf()!==id_prod)
         
          
        carrito.productos = nuevosProductos
        
         const updateCarrito = await carritoDao.update(id,carrito)
         
         res.status(200).json(updateCarrito);
        }
        catch(error) {
          next(error);
        }
      }
}

module.exports = new CarritoController()