const cookieParser = require("cookie-parser")
const express = require("express")
const app = require("./app")

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
