const express = require('express')
const authRouter = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Recipe = require('../models/recipe')

// Sign Up
authRouter.post("/signup", (req, res, next) => {
    console.log('BREAKPOINT 1')
    User.findAll({ where: {username :req.body.username.toLowerCase()} }, (err, user) => {
        console.log('BREAKPOINT 2')
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("Username already taken"))
        }
        const newUser = User.build({username: req.body.username, password: req.body.password})
        newUser.save((err, savedUser) => {
            console.log('USER SAVED')
            if(err){
                res.status(500)
                return next(err)
            } console.log(savedUser)
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword() })
        })
        return res.status(200)
    })
    // console.log('data')
    // const token = jwt.sign( 'emailplaceholder', process.env.SECRET )
    // return res.status(201).send({ token: token })
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