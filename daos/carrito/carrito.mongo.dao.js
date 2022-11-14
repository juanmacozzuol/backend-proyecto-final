const {Schema} = require('mongoose')
const MongoContainer = require("../../containers/mongo.contenedor");


const collection = "carrito"
const productosSchema = new Schema({
  nombre: {type: String},
  descripcion: {type: String},
  codigo :{type: String},
  precio :{type: Number},
  foto :{type: String},
  stock :{type: Number},
 // timestamps:true
})
const carritoSchema = new Schema({
  productos:[productosSchema],
  //timestamps :true,


})

class carritoMongoDao extends MongoContainer{
    constructor(){
        super(collection,carritoSchema)
    }
}

module.exports=carritoMongoDao