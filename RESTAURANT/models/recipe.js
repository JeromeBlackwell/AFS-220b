const Sequelize = require('sequelize')
const sequelize = require('./index')

const Recipe = sequelize.define('recipe', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    recipeID:{
        type: Sequelize.INTEGER,
        autoincrement: false,
        allowNull: false,
        
    }
})

module.exports = Recipe