const { ProductosDao } = require("../daos/app.daos");

const productosDao = new ProductosDao()

class ProductosController{

 async getProductos(req,res,next) {
     try{
        const productos = await productosDao.getAll()
       res.status(200).json(productos)

     }  
     catch(error){
        next(error);
     }
    }
    
   async getProductoById(req,res,next){
      const { id } = req.params;
    try {
      const producto = await productosDao.getById(id);
      
      res.status(200).json(producto);
    }
    catch(error) {
      next(error);
    }
   } 

   async saveProducto(req, res, next) {
      try {
        const newProducto = await productosDao.save(req.body);
        res.status(200).json(newProducto);
      }
      catch(error) {
        next(error);
      }
    }

   async updateProducto(req, res, next) {
   const { id } = req.params;
   try {
      const updateProducto = await productosDao.update(id, req.body);
      res.status(200).json(updateProducto);
   }
   catch(error) {
      next(error);
   }
   }

   async deleteProducto(req, res, next) {
      const { id } = req.params;
      try {
        const deletedProducto = await productosDao.deleteById(id);
       
        res.status(200).json(deletedProducto);
      }
      catch(error) {
        next(error);
      }
    }
}

module.exports = new ProductosController()