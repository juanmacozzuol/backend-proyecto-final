const envConfig = require("../config")
const firebaseConfig = require('./firebase/firebase.config.json')

firebaseConfig.project_id = envConfig.PROJECT_ID
firebaseConfig.private_key_id = envConfig.PRIVATE_KEY_ID
firebaseConfig.private_key = envConfig.PRIVATE_KEY
firebaseConfig.client_email = envConfig.CLIENTE_EMAIL
module.exports ={
    mongodb:{
        uri:`mongodb+srv://jmfcozzuol:${envConfig.DB_PASSWORD}@coderhousefinalproyect.3cwsvlv.mongodb.net/proyecto_final?retryWrites=true&w=majority`
    },
    firebase:{
        credentials:firebaseConfig
    }
}