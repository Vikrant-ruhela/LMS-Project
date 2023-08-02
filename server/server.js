const express = require("express")
const dbConnection = require('./configs/dbConnection')
const cors = require("cors")
const userRouter = require('./routes/userRouter')

const app = require("./app")

const cookieParser = require("cookie-parser")
app.use(express.json())
app.use(userRouter)
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(cookieParser())


app.listen(process.env.PORT, async () => {
    await dbConnection()
    console.log("server connected");
})
