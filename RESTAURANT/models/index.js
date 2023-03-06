const Sequelize = require('sequelize')


//Sequelize
const sequelize = new Sequelize('bryaneurocuisine', 'root', 'localhost69$', {
    dialect: 'mysql',
    host: '10.0.0.8',
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