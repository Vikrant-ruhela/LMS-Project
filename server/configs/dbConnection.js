const mongoose = require("mongoose")

const dbConnection = async function () {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Database connected");
}

module.exports = dbConnection