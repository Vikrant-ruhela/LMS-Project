const express = require("express")
const authenticate = require("../middleware/authenticate")
const {
    ping,
    register,
    logIn,
    logOut,
    profile,
    forgotPassword,
    resetPassword
} = require("../controllers/userController")
const upload = require('../middleware/multer')

const userRouter = express.Router()

userRouter.get('/ping', ping)
userRouter.post('/register', upload.single("avatar"), register)
userRouter.post('/login', logIn)
userRouter.get('/logout', authenticate, logOut)
userRouter.get('/me', authenticate, profile)
userRouter.post('/reset', forgotPassword)
userRouter.post('/reset/:token', resetPassword)


module.exports = userRouter

