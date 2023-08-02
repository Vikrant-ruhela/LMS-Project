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

function register(req, res) {
    // res.json(req.body)
    console.log(req.body);
    res.cookie('token', 'token').send('hello')

}

function logIn(req, res) {

}

function logOut(req, res) {

}

function profile(req, res) {

}


module.exports = {
    ping,
    register,
    logIn,
    logOut,
    profile
}