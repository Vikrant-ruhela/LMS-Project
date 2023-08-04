const cookieParser = require("cookie-parser")
const express = require("express")
const app = require("./app")
const cloudinary = require('cloudinary')
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

app.use(cookieParser())

const cors = require("cors")
app.use(cors({
    origin: "*",
    credentials: true
}))



const dbConnection = require('./configs/dbConnection')
const userRouter = require('./routes/userRouter')
app.use(express.json())
app.use(userRouter)




app.listen(process.env.PORT, async () => {
    await dbConnection()
    console.log("server connected");
})
