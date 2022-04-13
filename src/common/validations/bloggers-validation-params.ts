import {body} from "express-validator";
import {inputValidatorMiddleware} from "../../middlewares/input-validation-middleware";

const youTubeUrlRegEx = /(?:youtube\.com\/\S*(?:(?:\/e(?:mbed))?\/|watch\?(?:\S*?&?v\=))|youtu\.be\/)([a-zA-Z0-9_-]{6,11})/

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

export const bloggerValidation = [
    bloggerNameValidation,
    bloggerYouTubeURLValidation,
    inputValidatorMiddleware
]