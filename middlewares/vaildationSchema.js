const {body} = require('express-validator')

const vaildationSchema = () => {
    return [
        body("title")
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 2 })
            .withMessage("Enter at least 2 characters"),
        body("price")
            .notEmpty()
            .withMessage("price is required")
    ]
}
module.exports = {vaildationSchema}