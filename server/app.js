require('dotenv').config()
const express = require('express')
const app = express()

const userRouter = require('./routes/userRouter')

app.use(userRouter)

module.exports = app

