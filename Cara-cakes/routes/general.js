const express = require('express');
const {
    check,
    body
} = require('express-validator')

const router = express.Router();

const User = require('../models/user')

const generalRoutes = require('../controllers/general');

router.get('/', generalRoutes.getIndex);
router.get('/signup', generalRoutes.getSignUp);
router.get('/login', generalRoutes.getLogin);
router.post('/login', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail(),
    body('password', 'Password must be valid')
    .isLength({
        min: 5,
        max: 20
    })
    .isAlphanumeric()
    .trim()
], generalRoutes.postLogin);

router.get('/pastries/:baker', generalRoutes.getPastries);

router.post('/logout', generalRoutes.postLogout);
router.post('/signup', [check('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .normalizeEmail()
    .custom((value, {
        req
    }) => {
        // if(value === 'test@test.com') {
        //     throw new Error("This email is forbidden.")
        // }
        // return true;
        return User.findOne({
                email: value
            })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Existing E-mail, please try another.');
                }
            })
    })
    .trim(),
    body('telNo', 'Telephone number is invalid')
    .isLength({
        min: 9,
        max: 9,
    })
    .trim(),
    body('password', 'Please enter only Alphnumeric password and it should be at least 5 characters')
    .isLength({
        min: 5,
        max: 20
    })
    .isAlphanumeric(),
    body('confirmPassword')
    .custom((value, {
        req
    }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match!')
        }
        return true;
    })
], generalRoutes.postSignup)







module.exports = router;