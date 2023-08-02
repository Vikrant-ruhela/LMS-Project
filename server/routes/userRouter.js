const express = require("express")
const {
    ping,
    register,
    logIn,
    logOut,
    profile
} = require("../controllers/userController")

const userRouter = express.Router()

userRouter.get('/ping', ping)
userRouter.post('/register', register)
userRouter.post('/login', logIn)
userRouter.get('/logout', logOut)
userRouter.get('/me', profile)


module.exports = userRouter

