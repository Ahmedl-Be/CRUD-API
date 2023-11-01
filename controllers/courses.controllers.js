const Course = require("../models/courses.model")
const { validationResult } = require('express-validator')
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText")
const asyncWrapper = require("../middlewares/asyncWrapper")
const appError = require("../utils/appError")

const getAllCourses = asyncWrapper(
    async (req, res) => {
        const query = req.query
        console.log(query)
        const limit = query.limit || 10;
        let page = query.page || 1;
        const skip = (page - 1) * limit;
        const courses = await Course.find({}, { "__v": 0 }).limit(limit).skip(skip)
        res.json({ status: SUCCESS, data: { courses } })
    })

const getSingleCourse = asyncWrapper(
    async (req, res, next) => {
        const course = await Course.findById(req.params.courseId)
        if (!course) {
            const error = appError.create("not found course", 404, FAIL)
            return next(error);
        }
        return res.json({ status: SUCCESS, data: { course } })
    }
)

const createNewCourse = asyncWrapper(
    async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const error = appError.create(errors.array(), 400, FAIL)
            return next(error)
        }
        const newCourse = new Course(req.body)
        await newCourse.save()
        res.status(201).json({ status: SUCCESS, data: { course: newCourse } })
    }
)

const updateCourse = asyncWrapper(
    async (req, res) => {
        const courseId = req.params.courseId
        const updatedCourse = await Course.updateOne({ _id: courseId },
            { $set: { ...req.body } })
        return res.status(200).json({
            status: SUCCESS,
            data: { course: updatedCourse }
        })
    })

const deleteCourse = asyncWrapper(
    async (req, res) => {
        await Course.deleteOne({ _id: req.params.courseId })
        return res.status(200).json({ stauts: SUCCESS, data: null })
    })

module.exports = {
    getAllCourses,
    getSingleCourse,
    createNewCourse,
    updateCourse,
    deleteCourse
}
