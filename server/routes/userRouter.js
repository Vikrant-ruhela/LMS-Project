const express = require("express")
const authenticate = require("../middleware/authenticate")
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
userRouter.get('/logout', authenticate, logOut)
userRouter.get('/me', authenticate, profile)


module.exports = userRouter

