const express = require("express")
const app = express()

const mongoose = require('mongoose');
const url = 'mongodb+srv://ahmedbe:mongodbABX@learn-mongodb.080ugt3.mongodb.net/AbxCode?retryWrites=true&w=majority';
mongoose.connect(url).then(()=>
console.log('Connected successfully to server'))


app.use(express.json())

const coursesRouter = require("./routes/courses.route")

app.use("/api/courses",coursesRouter)

app.listen(5000, () => {
    console.log("listening on port 5000")
})