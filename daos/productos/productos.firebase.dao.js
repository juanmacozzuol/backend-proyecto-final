const FirebaseContainer = require("../../containers/firebase.contenedor");

const collection = "productos"
class ProductosFirebaseDao extends FirebaseContainer{
    constructor(){
        super(collection)
    }
}

module.exports = ProductosFirebaseDao