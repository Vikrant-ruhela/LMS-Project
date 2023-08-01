const express = require("express")
const home = require("../controllers/userController")

const userRouter = express.Router()

userRouter.get('/ping', home)

module.exports = home

