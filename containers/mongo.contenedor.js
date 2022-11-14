const mongoose = require('mongoose')
const dbConfig = require('../db/db.config')

class MongoContainer {

    constructor(collection, schema){
        this.model = mongoose.model(collection,schema)

    }

    static async connect(){
        await mongoose.connect(dbConfig.mongodb.uri)
    }

    static async disconnect(){
        await mongoose.disconnect();
    }
    async save(item){
       const newDocument = new this.model(item);
       return await newDocument.save()
    }

    async getById(id){
        const document = this.model.findOne({_id: id},{__v:0});
        if(!document){
            const message = `Resource with id ${id} does not exist`
            throw message
        }
        return document;
    }

    async getAll(filter = {}){
    
        const documents = await this.model.find(filter,{__v:0}).lean();
        return documents;
    }

    async deleteById(id){
    
        return await this.model.deleteOne({_id:id})
    }


    async update(id,item){
        const updatedDocument = await this.model.updateOne({_id:id},{$set:{...item}})

        if(!updatedDocument.matchedCount){
            const message = `Resource with id ${id} does not exist`
            throw message
        }
        
        return updatedDocument;

    }
}

module.exports = MongoContainer;