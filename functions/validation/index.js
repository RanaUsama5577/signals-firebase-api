import { check } from 'express-validator';
 
export const signalValidation = [
    check('coinId').notEmpty().withMessage('Parameter coinId is requied'),
    check('risk', 'Parameter risk is required and is number').isNumeric(),
    check('scalp', 'Parameter scalp is required and is number').isNumeric(),
    check('stop', 'Parameter stop is required and is double').isDecimal(),
    check('targetList').isArray().withMessage('Target list is required').isLength({ min: 1 }).withMessage('Atleast one item is required'),
    check('targetList.*.TargetPrice', 'Target price is required and should be double').isDecimal(),
    check('targetList.*.TargetPercentage', 'Target percentage is required and should be double').isDecimal(),
]

export const userValidation = [
    check('userName').notEmpty().withMessage('Parameter userName is requied'),
    check('email', 'Parameter email is required').isEmail(),
    check('acceptedTermsTimestamp').isDate("mm-dd-yyyy").withMessage('Should be a valid date in format mm-dd-yyyy').notEmpty().withMessage('Accepted terms field is required'),
    check('fcmToken').isString().withMessage('Fcm token is string field').notEmpty().withMessage('Fcm token is required'),
    check('os').isNumeric().withMessage('Os is number field').notEmpty().withMessage('Os is required'),
    check('password').isStrongPassword().isLength({min:6}).withMessage('Password should be atleast 6 characters long'),
]

export const messageValidation = [
    check('message').notEmpty().withMessage('Parameter message is requied'),
    check('creatorUserId').notEmpty().withMessage('Parameter creatorUserId is requied'),
    check('receivedUserId').notEmpty().withMessage('Parameter receivedUserId is requied'),
    check('messageTimestamp').isDate("mm-dd-yyyy").withMessage('Should be a valid date in format mm-dd-yyyy').notEmpty().withMessage('messageTimestamp field is required'),
]