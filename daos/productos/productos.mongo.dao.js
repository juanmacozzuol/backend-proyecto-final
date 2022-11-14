const {Schema} = require('mongoose')
const MongoContainer = require("../../containers/mongo.contenedor");

const collection = "productos"
const productosSchema = new Schema({
  nombre: {type: String},
  descripcion: {type: String},
  codigo :{type: String},
  precio :{type: Number},
  foto :{type: String},
  stock :{type: Number},
  //timestamps:true
})

class ProductosMongoDao extends MongoContainer{
    constructor(){
        super(collection,productosSchema)
    }
}

module.exports = ProductosMongoDao