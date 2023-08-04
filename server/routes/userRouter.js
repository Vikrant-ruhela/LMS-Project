const express = require("express")
const authenticate = require("../middleware/authenticate")
const {
    ping,
    register,
    logIn,
    logOut,
    profile
} = require("../controllers/userController")
const upload = require('../middleware/multer')

const userRouter = express.Router()

userRouter.get('/ping', ping)
userRouter.post('/register', upload.single("avatar"), register)
userRouter.post('/login', logIn)
userRouter.get('/logout', authenticate, logOut)
userRouter.get('/me', authenticate, profile)


module.exports = userRouter

