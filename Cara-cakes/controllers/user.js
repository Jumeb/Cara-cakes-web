const fs = require('fs');
const path = require('path');

const fileHelper = require('../util/file');
const PDFDocument = require('pdfkit');

const Event = require('../models/events');
const Cake = require('../models/product');
const Order = require('../models/orders');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getBds = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Birthday-cake'
        })
        .then(cakes => {
            console.log(cakes, 'birthday');
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/cakes',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getWeds = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Wedding-cake'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/weds',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getCookies = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Cookie'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/cookies',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getPans = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Pancake'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/pans',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getDons = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Doughnuts'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/dons',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getCups = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Cupcake'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/cups',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getVals = (req, res, next) => {
    const eventId = req.params.eventId;
    Cake.find({
            genre: 'Valentine'
        })
        .then(cakes => {
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                path: '/user/vals',
                pastries: cakes,
                eventId: eventId,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getPastry = (req, res, next) => {
    const pastryId = req.params.cakeId;
    Cake.findById(pastryId)
        .then(cake => {
            console.log(cake)
            res.render('user/shop-detail', {
                pageTitle: cake.name,
                path: '/user/pastry-detail',
                pastry: cake,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                user: false,
                shop: false
            })
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getUser = (req, res, next) => {
    let message = req.flash('success');
    let msg = req.flash('error');
    if (msg.length > 0) {
        msg = msg[0];
    } else {
        msg = null;
    }
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Event.find({
            userId: req.session.user
        })
        .populate('cart.items.pastryId')
        .populate('userId')
        .exec()
        .then(events => {
            if (events[0] == null) {
                User.findById(req.session.user)
                    .then(user => {
                        let title = 'Welcome, ' + user.name;
                        res.render('user/index', {
                            pageTitle: title,
                            path: '/user',
                            events: events,
                            user: user,
                            success: message,
                            errorMessage: msg,
                            noEvents: events.length,
                        })
                    })
            } else if (events) {
                let title = 'Welcome, ' + events[0].userId.name;
                User.findById(req.session.user)
                    .then(user => {
                        res.render('user/index', {
                            pageTitle: title,
                            path: '/user',
                            events: events,
                            user: user,
                            success: message,
                            errorMessage: msg,
                            noEvents: events.length,
                        })
                    })
            }

        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getAddEvent = (req, res, next) => {
    Event.find({
            userId: req.user
        })
        .populate('userId')
        .then(events => {
            if (events[0] == null) {
                User.findById(req.session.user)
                    .then(user => {
                        res.render('user/add-event', {
                            pageTitle: 'Welcome',
                            path: '/user/add-event',
                            event: user,
                            editing: false,
                            hasError: false,
                            event: {
                                name: '',
                                purpose: '',
                                day: '',
                                month: '',
                                year: '',
                                hour: '',
                                mins: '',
                                per: '',
                                image: '',
                                location: ''
                            },
                            user: user,
                            errorMessage: null,
                            validationErrors: null

                        })
                    })
            } else if (events) {
                User.findById(req.session.user)
                    .then(user => {
                        res.render('user/add-event', {
                            pageTitle: 'Add your event',
                            path: '/user/add-event',
                            editing: false,
                            hasError: false,
                            events: events,
                            event: {
                                name: '',
                                purpose: '',
                                day: '',
                                month: '',
                                year: '',
                                hour: '',
                                mins: '',
                                per: '',
                                image: '',
                                location: ''
                            },
                            user: user,
                            errorMessage: null,
                            validationErrors: null
                        })
                    })
            }
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}

exports.postAddEvent = (req, res, next) => {
    const name = req.body.name;
    const purpose = req.body.purpose;
    const day = req.body.day;
    const month = req.body.month;
    const year = req.body.year;
    const hour = req.body.hour;
    const mins = req.body.minute;
    const per = req.body.period;
    const image = req.file;
    const location = req.body.location;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(422).render('user/add-event', {
            pageTitle: "Add your event",
            path: '/user/add-event',
            editing: false,
            hasError: true,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            event: {
                name: name,
                purpose: purpose,
                day: day,
                month: month,
                year: year,
                hour: hour,
                mins: mins,
                per: per,
                location: location
            },
            user: [],
            validationErrors: errors.array(),
            errorMessage: errors.array()[0].msg
        });
    }

    if (!image.path) {
        return res.status(422).render('user/add-event', {
            pageTitle: "Add your event",
            path: '/user/add-event',
            editing: false,
            hasError: true,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            event: {
                name: name,
                purpose: purpose,
                day: day,
                month: month,
                year: year,
                hour: hour,
                mins: mins,
                per: per,
                location: location
            },
            user: [],
            validationErrors: [],
            errorMessage: 'File is not an image (png,jpg,jpeg)'
        });
    }
    const event = new Event({
        name: name,
        image: image.path,
        purpose: purpose,
        day: day,
        month: month,
        year: year,
        hour: hour,
        mins: mins,
        per: per,
        userId: req.user,
        location: location
    });

    event
        .save()
        .then(result => {
            req.flash('success', 'Event successfully added.');
            res.redirect('/user');
        })
        .catch(err => {
            req.flash('error', 'Could not add event, Please try again later.');
        })
};


exports.getEditEvent = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/user');
    }
    const eventId = req.params.eventId;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('user/add-event', {
            pageTitle: "Edit your event",
            path: '/user/edit-event',
            editing: false,
            hasError: true,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            event: {
                name: name,
                purpose: purpose,
                day: day,
                month: month,
                year: year,
                hour: hour,
                mins: mins,
                per: per,
                image: image,
                location: location,
                _id: eventId

            },
            validationErrors: errors.array(),
            errorMessage: errors.array()[0].msg
        });
    }

    Event.findById(eventId)
        .populate('userId')
        .then(event => {
            if (!event) {
                req.flash('error', 'Could not find this event.')
                res.redirect('/user');
            }
            res.render('user/add-event', {
                pageTitle: "Edit your event",
                path: '/user/edit-event',
                event: event,
                user: event,
                editing: editMode,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                errorMessage: null,
                validationErrors: null
            })
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.postEditEvent = (req, res, next) => {
    const eventId = req.body.eventId
    const updatedPurpose = req.body.purpose;
    const updatedName = req.body.name;
    const updatedDay = req.body.day;
    const updatedMonth = req.body.month;
    const updatedYear = req.body.year;
    const updatedHour = req.body.hour;
    const updatedMins = req.body.minute;
    const updatedPer = req.body.period;
    const updatedLoc = req.body.location;
    const Image = req.file;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('user/add-event', {
            pageTitle: "Edit your event",
            path: '/user/edit-event',
            editing: true,
            hasError: true,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            event: {
                name: updatedName,
                purpose: updatedPurpose,
                day: updatedDay,
                month: updatedMonth,
                year: updatedYear,
                hour: updatedHour,
                mins: updatedMins,
                per: updatedPer,
                image: updatedImage,
                location: updatedLoc,
                _id: eventId
            },
            validationErrors: errors.array(),
            errorMessage: errors.array()[0].msg
        });
    }
    Event.findById(eventId)
        .then(event => {
            event.name = updatedName;
            event.purpose = updatedPurpose;
            event.day = updatedDay;
            event.month = updatedMonth;
            event.year = updatedYear;
            event.hour = updatedHour;
            event.mins = updatedMins;
            if (Image) {
                fileHelper.deleteFile(event.image);
                event.image = Image.path;
            }
            event.per = updatedPer;
            event.location = updatedLoc;
            return event.save();
        })
        .then(result => {
            req.flash('success', 'Event successfully updated.');
            res.redirect('/user');
        })
        .catch(err => {
            req.flash('error', 'Could not edit event, Please try again later.');
        });
}

exports.getDeleteEvent = (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findById(eventId)
        .populate('userId')
        .then(event => {
            if (!event) {
                res.redirect('/user');
            }
            console.log(event);
            User.findById(event.userId._id)
            .then(user => {
                res.render('user/confirm', {
                    pageTitle: 'Deleting event',
                    path: '/user/delete-event',
                    event: event,
                    user: user,
                    authenticated: req.session.loggedIn,
                    csrfToken: req.csrfToken()
                })
            })
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.postDeleteEvent = (req, res, next) => {
    const eventId = req.body.eventId;
    Event.findById(eventId)
        .then(event => {
            if (!event) {
                return next(new Error('Event not found'));
            }
            fileHelper.deleteFile(event.image);
            return Event.findByIdAndRemove(eventId)
        })
        .then(result => {
            req.flash('success', 'Event successfully deleted.')
            res.redirect('/user');
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}


exports.getCart = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    const eventId = req.params.eventId;
    Event.findById(eventId)
        .populate('cart.items.pastryId')
        .populate('userId')
        // .exec()
        .then(pastries => {
            event = pastries;
            pastries = pastries.cart.items;
            res.render('user/eventCart', {
                pageTitle: event.name,
                path: '/user/event-cart',
                event: event,
                user: event,
                pastries: pastries,
                success: message,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken()
            })
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}


exports.postCartDelete = (req, res, next) => {
    const eventId = req.body.eventId;
    const pastryId = req.body.pastryId;
    let path = '/user/event-cart/' + eventId.toString();
    Event.findById(eventId)
        .then(event => {
            event.removeFromCart(pastryId)
        })
        .then(result => {
            req.flash('success', 'Pastry successfully removed from cart.')
            res.redirect(path);
        })

}


exports.postAddCart = (req, res, next) => {
    const pastryId = req.body.pastryId;
    const eventId = req.body.eventId;
    let path = '/user/cakes/' + eventId.toString();
    Cake.findById(pastryId)
        .then(pastry => {
            Event.findById(eventId)
                .then(event => {
                    return event.addToCart(pastry);
                })
        })
        .then(result => {
            setTimeout(() => {
                res.redirect(path);
            }, 3600000)
        });
};

exports.postSubCart = (req, res, next) => {
    const pastryId = req.body.pastryId;
    const eventId = req.body.eventId;
    Cake.findById(pastryId)
        .then(pastry => {
            Event.findById(eventId)
                .then(event => {
                    return event.subFromCart(pastry);
                })
        })
        .then(result => {
            setTimeout(() => {
                res.redirect('/user/cakes');
            }, 3600000)
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({
            "user.userId": req.user
        })
        .populate('userId')
        .then(orders => {
            if (orders[0] == null) {
                User.findById(req.user)
                    .then(user => {
                        console.log(user )
                        res.render('user/userOrder', {
                            path: '/user/orders',
                            pageTitle: 'Your Orders',
                            user: user,
                            order: orders,
                            event: orders,
                            noOrders: orders.length,
                        })
                    })
            } else if (orders) {
                User.findById(req.user)
                    .then(user => {
                        res.render('user/userOrder', {
                            path: '/user/orders',
                            pageTitle: 'Your Orders',
                            order: orders,
                            event: orders,
                            user: user,
                            noOrders: orders.length,
                        })
                    })
            }
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}


exports.postOrder = (req, res, next) => {
    const eventId = req.body.eventId;
    const totalAmount = req.body.totalAmount;
    Event.findById(eventId)
        .populate('cart.items.pastryId')
        .then(event => {
            const pastries = event.cart.items.map(i => {
                return {
                    quantity: i.quantity,
                    pastry: {
                        ...i.pastryId._doc
                    }
                }
            });
            const order = new Order({
                user: {
                    name: req.user.name,
                    userId: req.user
                },
                event: {
                    name: event.name,
                    eventId: event,
                    location: event.location,
                    purpose: event.purpose,
                    day: event.day,
                    month: event.month,
                    min: event.mins,
                    per: event.per,
                    hour: event.hour,
                    year: event.year,
                    totalAmount: totalAmount

                },
                pastries: pastries
            });

            return order.save();
        })
        .then(clear => {
            event.clearCart();
        })
        .then(result => {
            req.flash('success', 'Order successfully placed.')
            res.redirect('/user/orders');
        })
        .catch(err => {
            const errror = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
};


///////////////////////////////////
//      Edit Profile            //
/////////////////////////////////

exports.getEditForm = (req, res, next) => {
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            res.render('user/edit-profile', {
                path: 'user/edit-profile',
                pageTitle: 'Edit User Info',
                user: user,
                event: user,
                editing: true,
                hasError: false
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.postEditProfile = (req, res, next) => {
    const userId = req.body.userId;
    const name = req.body.name;
    const telNo = req.body.telNo;
    const Image = req.file;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('user/edit-profile', {
            path: '/user/edit-profile',
            pageTitle: 'Edit Profile',
            editing: true,
            hasError: true,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            user: {
                name: name,
                telNo: telNo,
                _id: userId
            },
            validationErrors: errors.array(),
            errorMessage: errors.array()[0].msg
        })
    }

    User.findById(userId)
        .then(user => {
            user.name = name;
            user.telNo = telNo;
            if (Image) {
                fileHelper.deleteFile(user.image);
                user.image = Image.path;
            }
            return user.save();
        })
        .then(result => {
            req.flash('success', 'Profile Edited');
            res.redirect('/user');
        }).catch(err => {
            req.flash('error', 'Profile not Edited, Please try again later.');
        })

}

exports.getDetails = (req, res, next) => {
    const orderId = req.params.orderId;
    Order.findById(orderId)
        .then(order => {
            if (!order) {
                return next(new Error('No order found.'));
            }
            if (order.user.userId.toString() !== req.user._id.toString()) {
                return next(new Error('Unauthorized'));
            }
            const order_dets = 'order-dets-' + orderId + '.pdf';
            const detPath = path.join('data', 'orders', order_dets);

            const pdfDoc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="' + order_dets + '"');

            pdfDoc.pipe(fs.createWriteStream(detPath));
            pdfDoc.pipe(res);

            pdfDoc.fontSize(24).text('Hello Jume', {
                underline: true
            });
            pdfDoc.text(order.event.name)
            pdfDoc.text('___________________________________');
            let totalPrice = 0;
            order.pastries.forEach(pastry => {
                totalPrice += pastry.quantity * pastry.pastry.price;
                pdfDoc.fontSize(14).text(pastry.pastry.name + ' - ' + pastry.quantity + ' x ' + pastry.pastry.price + 'FCFA');
            })
            pdfDoc.text('____________________________________')
            pdfDoc.fontSize(18).text('Total Price: ' + totalPrice + 'FCFA');
            pdfDoc.end();

            // fs.readFile(detPath, (err, data) => {
            //     if (err) {
            //         return next(err);
            //     }
            //     res.setHeader('Content-Type', 'application/pdf');
            //     res.setHeader('Content-Disposition', 'inline; filename="' + order_dets + '"');
            //     res.send(data);
            // })

            // const file = fs.createReadStream(detPath);
            // file.pipe(res);


        })
        .catch(err => next(err))

};