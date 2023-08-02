const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,
    secure: true
}

function ping(req, res) {
    res.send("pong")
}

async function register(req, res) {
    try {
        const { fullname, email, password } = req.body

        if (!(fullname, email, password)) {
            throw new Error("all details are required")
        }

        const user = await userModel.findOne({ email })
        if (user) {
            throw new Error("User already exists")
        }

        if (password.length < 8) {
            throw new Error("password must be 8 charaters long")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const User = await userModel.create({
            fullname, email, password: hashPassword
        })

        const token = await User.generateJwtToken()

        User.password = undefined
        res.cookie('token', token, cookieOptions).status(200).json({
            "success": true,
            "message": "User signup success",
            "user": User,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

async function logIn(req, res) {
    try {
        const { email, password } = req.body

        if (!(email, password)) {
            throw new Error("all details are required")
        }

        const user = await userModel.findOne({ email }).select("+password")
        if (!user) {
            throw new Error("User not registered")
        }

        if (password.length < 8) {
            throw new Error("password must be 8 charaters long")
        }

        if (!bcrypt.compare(password, user.password)) {
            throw new Error("incorrect password")
        }

        const token = await user.generateJwtToken()

        user.password = undefined
        res.cookie('token', token, cookieOptions).status(200).json({
            "success": true,
            "message": "User login success",
            "user": user,
            token: token
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

function logOut(req, res) {

    res.cookie('token', null, cookieOptions).status(200).json({
        "success": true,
        "message": "User logout success"
    })

}

async function profile(req, res) {
    const { id } = req.user
    const user = await userModel.findOne({ _id: id })
    res.status(200).json({
        user
    })

}


module.exports = {
    ping,
    register,
    logIn,
    logOut,
    profile
}