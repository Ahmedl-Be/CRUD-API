const jwt = require('jsonwebtoken');
const { FAIL, ERROR } = require("../utils/httpStatusText")
const appError = require("../utils/appError")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['Authorization'] || req.headers['authorization']
    if (!authHeader) {
        const error = appError.create("token is required", 401, FAIL)
        return next(error)
    }
    const token = authHeader.split(' ')[1];
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(currentUser)
        req.currentUser = currentUser;
        next();
    } catch (err) {
        const error = appError.create("invailed token", 401, ERROR)
        return next(error);
    }
}

module.exports = verifyToken;