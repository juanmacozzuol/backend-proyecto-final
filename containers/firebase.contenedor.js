const admin = require('firebase-admin')
const {getFirestore} = require("firebase-admin/firestore")
const dbConfig = require('../db/db.config')

function  connect(){
    admin.initializeApp({
        credential : admin.credential.cert(dbConfig.firebase.credentials)
    })
    console.log("Firebase connected!")
}
connect()


class FirebaseContainer {
    constructor(collection){
        //FirebaseContainer.connect()
        const db = getFirestore()
        this.query= db.collection(collection)
    }

    async save(item){
       const  docRef = this.query.doc();
       return await docRef.set(item)

    }
 
     async getById(id){

        const docRef = await this.query.doc(id);
        if(!docRef){
            const message = `Resource with id ${id} does not exist`
            throw message
        }
        const document = await docRef.get()

        return document.data()
    }
 
    async getAll(){
        const docRef = await this.query.get();

        const documents = docRef.docs;

        return documents.map(document =>{
            return{
                id:document.id,
                ...document.data()
            }
        })
        
    
    }
 
     async deleteById(id){
     
       const docRef = this.query.doc(id)
       return await docRef.delete()
    }
 
 
     async update(id,item){
        const docRef = this.query.doc(id);
        if(!docRef){
            const message = `Resource with id ${id} does not exist`
            throw message
        }
        return await docRef.update(item)
    }

}

module.exports = FirebaseContainer