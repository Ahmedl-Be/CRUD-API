require('dotenv').config();
const express = require("express")
const { ERROR, FAIL } = require("./utils/httpStatusText")
const coursesRouter = require("./routes/courses.route")
const usersRouter = require("./routes/users.route")
const app = express()
const mongoose = require('mongoose');
const url = process.env.DATABASE_URL
const cors = require("cors")
const path = require('path')


mongoose.connect(url).then(() =>
    console.log('Connected successfully to server'))

app.use("/uploads", express.static(path.join(__dirname, 'uploads')));


app.use(cors())

app.use(express.json())

app.use("/api/courses", coursesRouter)

app.use("/api/users", usersRouter)

// Global middelware for not found routes 
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: ERROR,
        message: "This resourse is not available"
    })
})

// Global error handler 
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: null
    })
})



app.listen(process.env.PORT, () => {
    console.log("listening on port 5000")
})
