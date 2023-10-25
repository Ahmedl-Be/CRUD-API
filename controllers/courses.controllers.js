const Course = require("../models/courses.model")
const { validationResult } = require('express-validator')

const getAllCourses = async (req, res) => {
    const courses = await Course.find()
    res.json(courses)
}

const getSingleCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId)
        !course && res.status(404).json({ msg: "Course Not Found" })
        return res.json(course)
    } catch (err) {
        return res.status(400).json({ msg: "Invalid Object ID" })
    }
}

const createNewCourse = async (req, res) => {
    const errors = validationResult(req)
    !errors.isEmpty() && res.status(400).json(errors.array())
    const newCourse = new Course(req.body)
    await newCourse.save()
    res.status(201).json(newCourse)
}

const updateCourse = async (req, res) => {
    const courseId = req.params.courseId
    try {
        const updatedCourse = await Course.updateOne({_id:courseId},
            { $set: { ...req.body } })
        return res.status(200).json(updatedCourse)
    } catch (err) {
        return res.status(400).json({error: err})
    }
}

const deleteCourse = async (req, res) => {
    try{
        await Course.deleteOne({_id: req.params.courseId})
        return res.status(200).json({ success: true})
    }catch(err){
        return res.status(400).json({error: err})
    }
}

module.exports = {
    getAllCourses,
    getSingleCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}
