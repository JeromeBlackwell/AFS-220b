const express = require('express')
const app = express()
const mysql = require('mysql2')
require('dotenv').config()
const morgan = require('morgan')
const { expressjwt: jwt } = require('express-jwt')


//MiddleWare
app.use(express.json())
app.use(morgan('dev'))

// //MySQL connection
// const db = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     password:'localhost69$',
//     database:'bryaneurocuisine'
// })

// //Connect to DB
// db.connect((err) => {
//     if(err){
//         throw err
//     }
//     console.log('Connected to DB')
// })

//Routes
// app.use('/auth', require('./routes/authRouter.js'))
// app.use('/api/', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
// app.use('/api/mycart', require('./routes/issueRouter.js'))





//Error Handling
app.use((err, req, res, next)=> {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({errMsg: err.message})
})

//Server Startup
app.listen(9000, () => {
    console.log('Server is running on Port 9000')
})