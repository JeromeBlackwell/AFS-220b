const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const morgan = require('morgan')
const { expressjwt: jwt } = require('express-jwt')


//MiddleWare
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))


//Routes
app.use('/auth', require('./routes/authRouter'))
app.use('/api/', jwt({ secret: process.env.SECRET, algorithms: ['HS256']}))
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
