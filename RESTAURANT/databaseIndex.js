const sequelize = require('./models/index')
const User = require('./models/user')
const Recipe = require('./models/recipe')

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection Established')
    }).catch(err => {
        console.log('Unable to Connect to DB', err)
    })