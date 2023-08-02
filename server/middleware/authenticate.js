const jwt = require("jsonwebtoken")

function authenticate(req, res, next) {

    console.log(req.cookies);
    const token = req.cookies.token
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2EzNDIwNjViMDMzYmRkNjllZmMwMCIsImVtYWlsIjoibWFuaW5kZXJAZ21haWwuY29tIiwic3Vic2NyaXB0aW9uIjp7fSwicm9sZSI6IlVTRVIiLCJpYXQiOjE2OTA5NzMyMzIsImV4cCI6MTY5MTA1OTYzMn0.5Y4Q2krA-n0HuZZlVrYfRhwypf791UwmPnehf-iSOI0"
    if (!token) {
        res.status(400).json({
            success: false,
            message: "token not found"
        })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data
        return next()
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = authenticate