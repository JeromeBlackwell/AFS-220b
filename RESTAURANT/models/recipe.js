const Sequelize = require('sequelize')
const sequelize = require('./index')

const Recipe = sequelize.define('recipe', {
    id:{
        type: Sequelize.INTEGER,
        autoincrement: true,
        allowNull: false,
    },
    recipeID:{
        type: Sequelize.INTEGER,
        autoincrement: false,
        allowNull: false,
        primaryKey: true
    }
})

module.exports = Recipe