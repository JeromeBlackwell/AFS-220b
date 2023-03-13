const sequelize = require('./models/index')
const User = require('./models/user')
const Recipe = require('./models/recipe')

User.hasMany(Recipe);

let userId = null
sequelize
    .sync({force: true})
    .then((result) => {
        return User.create({username: 'testuser', password: 'testpassword'})
        console.log(result)
    })
    // .then(user => {
    //     userId = user.id
    //     console.log('Test User Created', user)
    //     return user.createRecipe({recipeID: 11111})
    // })
    // .then(recipe => {
    //     console.log('Recipe ID is: ', recipe)
    //     return Recipe.findAll({where: userId})
    // })
    .then(recipes => {
        console.log(recipes)
    })
    .catch(err => {
        console.log('Unable to Connect to DB', err)
    })


module.exports = sequelize

