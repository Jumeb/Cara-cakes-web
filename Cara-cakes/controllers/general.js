const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const {
    validationResult
} = require('express-validator')

const User = require('../models/user')

const transporter = nodemailer.createTransport(sendgrid({
    auth: {
        api_key: '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'
    }
}));

exports.getIndex = (req, res, next) => {
    res.render('general/index', {
        pageTitle: 'Resting place for flavours',
        path: '/',
        headerType: 'head-home',
        bodyType: 'back-home body',
        oldInput: {
            email: '',
            password: ''
        }
    });
}


exports.getStories = (req, res, next) => {
    res.render('general/stories', {
        pageTitle: 'People stories',
        path: '/stories',
        headerType: 'head-story',
        bodyType: 'back-story body'
    });
}



///////////////////////////////////
//                               //
//         SIGNUP USER           //
//                               //
///////////////////////////////////


exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('general/signup', {
        pageTitle: 'SignUp for Cara Cakes',
        path: '/signup',
        headerType: '',
        bodyType: 'back-signup body',
        authenticated: false,
        errorMessage: message,
        validationErrors: [],
        oldInput: {
            email: "",
            name: '',
            telNo: '',
            password: '',
            confirmPassword: ''
        }
    })
}

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const name = req.body.name;
    const telNo = req.body.telNo;
    const password = req.body.password;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array() + ' ok');
        return res.status(422).render('general/signup', {
            pageTitle: 'SignUp for Cara Cakes',
            path: '/signup',
            headerType: '',
            bodyType: 'back-signup body',
            authenticated: false,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            oldInput: {
                email: email,
                name: name,
                telNo: telNo,
                password: password
            }
        })
    }
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const user = new User({
                name: name,
                email: email,
                telNo: telNo,
                password: hashedPassword
            });
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
            return transporter.sendMail({
                to: email,
                from: 'cara_cakes@gmail.com',
                subject: 'Signup succeeded!',
                html: '<h1>You successfully signed up!<h1>'
            })
        })
        .catch(err => {
            console.log("over here");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })


}


///////////////////////////////////
//                               //
//         LOGIN USER            //
//                               //
///////////////////////////////////



exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('general/login', {
        pageTitle: 'Login to Cara Cakes',
        path: '/login',
        headerType: '',
        bodyType: 'back-signup body',
        errorMessage: message,
        oldInput: 'ksdf',
        oldIput: {
            email: '',
            password: ''
        },
        validationErrors: ''
    })
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).render('general/login', {
            pageTitle: 'Login to Cara Cakes',
            path: '/login',
            headerType: '',
            bodyType: 'back-signup body',
            errorMessage: errors.array()[0].msg,
            oldInput: {
                email: email,
                password: password
            },
            validationErrors: errors.array()
        });
    }
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.status(422).render('general/login', {
                    pageTitle: 'Login to Cara Cakes',
                    path: '/login',
                    headerType: '',
                    bodyType: 'back-signup body',
                    errorMessage: 'Invalid Email or Password',
                    oldInput: {
                        email: email,
                        password: password
                    },
                    validationErrors: []
                });
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    let name = user.name;
                    let message = 'Welcome, ' + name;
                    if (doMatch) {
                        req.session.loggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            req.flash('success', message);
                            res.redirect('/user');
                        });
                    }
                    return res.status(422).render('general/login', {
                        pageTitle: 'Login to Cara Cakes',
                        path: '/login',
                        headerType: '',
                        bodyType: 'back-signup body',
                        errorMessage: 'Invalid Email or Password',
                        oldInput: {
                            email: email,
                            password: password
                        },
                        validationErrors: []
                    });
                })
                .catch(err => {
                    console.log(err)
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log("oosje");
                    const errror = new Error(err);
                    error.httpStatusCode = 500;
                    return next(error);
                })
        })
}

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err)
        res.redirect('/login');
    });
}