const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        select: false
    },
    avatar: {
        publicId: {
            type: String
        },
        secureUrl: {
            type: String
        }
    },
    role: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER"
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    subscription: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    }

}, { timestamps: true })

userSchema.methods = ({
    generateJwtToken: async function () {
        return await jwt.sign({ id: this._id, email: this.email, subscription: this.subscription, role: this.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
    },
    PasswordResetToken: async function () {
        const resetToken = await crypto.randomBytes(20).toString('hex')

        this.forgotPasswordToken = await crypto.createHash('sha256').update(resetToken).digest('hex')

        this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000

        return resetToken
    },

})

const userModel = mongoose.model("userModel", userSchema)
module.exports = userModel 