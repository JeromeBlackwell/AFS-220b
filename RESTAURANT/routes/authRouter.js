const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const sequelize = require('../models/index')
// const User = sequelize.models.User
// console.log(typeof(sequelize.models.recipe))
// const allUsers = sequelize.models.User.findAll()
// console.log(allUsers) 

// Sign Up
authRouter.post("/signup", async (req, res, next) => {
    
    const allUsers = await sequelize.models.User.findOne({ where: {username : req.body.username}})
        console.log(allUsers)
    if (allUsers === null){
        console.log('Not Found')
        const newUser = await sequelize.models.User.create({username: req.body.username, password: req.body.password})
        if (newUser === null){
            return res.status(500)
        } else {
            const token = jwt.sign(newUser.username, process.env.SECRET)
            return res.status(201).send({token, user: newUser.username })
        }
    } else {
        return res.status(403).send({errmessage: 'Username Already Exits'})
    }
})

// Login
authRouter.post("/login", (req, res, next) => {
    const failedLogin = 'Username or Password is Incorrect'
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error(failedLogin))
        }
        user.checkPassword(req.body.password, (err, isMatch) => {
            if(err){
                res.status(403)
                return next(new Error(failedLogin))
            }
            if(!isMatch){
                res.status(403)
                return next(new Error(failedLogin))
            }
            const token = jwt.sign(user.toObject(), process.env.SECRET)
            return res.status(200).send({ token, user })
        })
    })
})

module.exports = authRouter