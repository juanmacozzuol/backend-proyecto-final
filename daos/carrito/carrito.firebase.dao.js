const FirebaseContainer = require("../../containers/firebase.contenedor");

const collection = "carrito"
class CarritoFirebaseDao extends FirebaseContainer{
    constructor(){
        super(collection)
    }
}

module.exports = CarritoFirebaseDao