const express = require("express")
const controllers = require("../controllers/courses.controllers")
const {vaildationSchema} = require("../middlewares/vaildationSchema")
const router = express.Router()

router.route("/")
            .get(controllers.getAllCourses)
            .post(vaildationSchema(),controllers.createNewCourse)

router.route('/:courseId')
            .get(controllers.getSingleCourse)
            .patch(controllers.updateCourse)
            .delete(controllers.deleteCourse)

module.exports = router