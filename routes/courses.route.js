const express = require("express")
const controllers = require("../controllers/courses.controllers")
const {vaildationSchema} = require("../middlewares/vaildationSchema")
const verifyToken= require("../middlewares/verifyToken")
const userRoles = require("../utils/userRoles")
const allowedTo = require("../middlewares/allowedTo")
const router = express.Router()

router.route("/")
            .get(controllers.getAllCourses)
            .post(
                verifyToken,
                allowedTo(userRoles.MANGER),
                vaildationSchema(),
                controllers.createNewCourse
            )

router.route('/:courseId')
            .get(controllers.getSingleCourse)
            .patch(controllers.updateCourse)
            .delete(
                verifyToken,
                allowedTo(userRoles.ADMIN,userRoles.MANGER),
                controllers.deleteCourse
            )

module.exports = router