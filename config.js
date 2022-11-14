const dotenv = require('dotenv')
dotenv.config()

module.exports={
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATASOURCE: process.env.DATASOURCE,
    PROJECT_ID :process.env.PROJECT_ID,
    PRIVATE_KEY_ID : process.env.PRIVATE_KEY_ID,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    CLIENTE_EMAIL : process.env.CLIENTE_EMAIL
}