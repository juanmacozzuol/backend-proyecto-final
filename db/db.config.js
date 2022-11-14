const envConfig = require("../config")
const firebaseConfig = require('./firebase/firebase.config.json')


module.exports ={
    mongodb:{
        uri:`mongodb+srv://jmfcozzuol:${envConfig.DB_PASSWORD}@coderhousefinalproyect.3cwsvlv.mongodb.net/proyecto_final?retryWrites=true&w=majority`
    },
    firebase:{
        credentials:firebaseConfig
    }
}