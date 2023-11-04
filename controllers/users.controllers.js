const asyncWrapper = require("../middlewares/asyncWrapper")
const User = require("../models/user.model")
const { SUCCESS, FAIL, ERROR } = require("../utils/httpStatusText")
const appError = require("../utils/appError")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJwt = require("../utils/generateJwt");


const getAllusers = asyncWrapper(
    async (req, res) => {
        const query = req.query
        const limit = query.limit || 10;
        let page = query.page || 1;
        const skip = (page - 1) * limit;
        const users = await User.find({}, { "__v": 0, "password": 0 })
            .limit(limit).skip(skip)
        res.json({ status: SUCCESS, data: { users } })
    })


const register = asyncWrapper(
    async (req, res, next) => {
        const { firstName, lastName, email, password, role } = req.body;
        const oldUser = await User.findOne({ email: email });
        if (oldUser) {
            const error = appError.create("User Already Exists", 404, FAIL)
            return next(error);
        }
        // password hasing
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            avatar: req.body.avatar
        })
        console.log("avater",req.body.avatar)
        // generate JWT token
        const token = await generateJwt({
            email: newUser.email,
            id: newUser._id,
            role: newUser.role
        });
        newUser.token = token
        await newUser.save()
        res.status(201).json({ status: SUCCESS, data: { user: newUser} })
    })


const login = asyncWrapper(async (req, res, next) => {
    const { email, password } = req.body
    if (!email && !password) {
        const error = appError.create("invailed input", 404, FAIL)
        return next(error);
    }
    const user = await User.findOne({ email: email })
    if (!user) {
        const error = appError.create("User Not Found !!", 400, ERROR)
        return next(error);
    }
    const matchedPassword = await bcrypt.compare(password, user.password)
    if (user && matchedPassword) {
        const token = await generateJwt({
            email: user.email,
            id: user._id,
            role: user.role,
        });
        return res.json({ status: SUCCESS, data: {token} })
    } else {
        const error = appError.create("Something went wrong !!", 500, ERROR)
        return next(error);
    }
})

module.exports = {
    getAllusers,
    register,
    login,
}
