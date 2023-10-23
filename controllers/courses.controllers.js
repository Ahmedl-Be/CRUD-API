let {courses} = require("../data/courses")
const {validationResult} = require('express-validator')

const getAllCourses = (req, res) => {
    res.json(courses)
}

const getSingleCourse = (req, res) => {
    console.log(req.params.courseId)
    const cId = +req.params.courseId
    const course = courses.find(course => course.id === cId)
    !course && res.status(404).json({ msg: "Course Not Found" })
    res.json(course)
}

const createNewCourse =  (req, res) => {
    const errors = validationResult(req)
    !errors.isEmpty() && res.status(400).json(errors.array())
    const course = { id: courses.length + 1, ...req.body }
    courses.push(course)
    res.status(201).json(course)
}

const updateCourse = (req,res)=>{
    const id = + req.params.courseId
    let course = courses.find(course => course.id === id)
    !course && res.status(404).json({ msg: "Course Not Found" })
    course = {...course, ...req.body}
    res.status(200).json(course)
}

const deleteCourse = (req,res)=>{
    const id = + req.params.courseId
    courses = courses.filter(course => course.id !== id)
    res.status(200).json({success:true})
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}