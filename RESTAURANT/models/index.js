const Sequelize = require('sequelize')


//Sequelize
const sequelize = new Sequelize('bryaneurocuisine', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost',
    port: '3306',
    pool: {
        max: 5,
        min: 0,
        idle: 20000,
        evict: 15000,
        acquire: 30000
    },
})

module.exports = sequelize