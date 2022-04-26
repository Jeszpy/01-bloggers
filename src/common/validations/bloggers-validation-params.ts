import {body, query} from "express-validator";
import {inputValidatorMiddleware} from "../../middlewares/input-validation-middleware";


// TODO: make working regex!
// const youTubeUrlRegEx = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/
const youTubeUrlRegEx = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+$/


const bloggerNameValidation = body('name')
    .isString()
    .withMessage('input value must be a string')
    .trim()
    .notEmpty()
    .withMessage('field must not be empty')
    .isLength({min: 1, max: 15})
    .withMessage('min-max 1-15 symbols')

const bloggerYouTubeURLValidation = body('youtubeUrl')
    .isString()
    .withMessage('input value must be a string')
    .trim()
    .notEmpty()
    .withMessage('field must not be empty')
    .isLength({min: 1, max: 100})
    .withMessage('min-max 1-100 symbols')
    .matches(youTubeUrlRegEx)
    .withMessage(`must be matches ${youTubeUrlRegEx}`)

const pageNumberValidation = query('pageNumber')
    .notEmpty()
    .withMessage('this field cant be empty')
    .not()
    .isString()
    .withMessage('this field must be a number')
    .not()
    .isArray()
    .withMessage('this field must be a number')
    .isInt()
    .toInt()
    .withMessage('this field must be a number')

const pageSizeValidation = query('pageSize')
    .notEmpty()
    .withMessage('this field cant be empty')
    .not()
    .isString()
    .withMessage('this field must be a number')
    .not()
    .isArray()
    .withMessage('this field must be a number')
    .isInt()
    .toInt()
    .withMessage('this field must be a number')

const bloggerIdValidation = query('bloggerId')
    .trim()
    .notEmpty()
    .withMessage('field must not be empty')
    .isInt()
    .toInt()
    .withMessage('this field must be a number')


export const bloggerValidation = [
    bloggerNameValidation,
    bloggerYouTubeURLValidation,
    inputValidatorMiddleware
]

export const bloggerIDValidation = [
    bloggerIdValidation,
    inputValidatorMiddleware
]