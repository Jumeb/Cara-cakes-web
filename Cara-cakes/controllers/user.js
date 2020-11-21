const fs = require('fs');
const path = require('path');

const fileHelper = require('../util/file');
const PDFDocument = require('pdfkit');

const Event = require('../models/events');
const Cake = require('../models/product');
const Order = require('../models/orders');
const Admin = require('../models/admin');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.getBakers = (req, res, next) => {
    const eventId = req.params.eventId;
    const baker = req.query.baker;
    Admin.find({type: 'admin'}).then(admins => { 
        res.render('user/bakers', {
            pageTitle: 'Bakers',
            path:'/user/bakers',
            eventId: eventId,
            admins: admins,
            authenticated: req.session.loggedIn,
            csrfToken: req.csrfToken(),
            shop: true,
        })
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}

exports.getPastries = (req, res, next) => {
    const eventId = req.params.eventId;
    const baker = req.query.baker;
    const genre = req.query.genre;
    Cake.find()
        .then(cakes => {
            let _pastries = cakes.filter((pastry) => pastry.baker === baker);
            _pastries = _pastries.filter((pastry) => pastry.genre === genre);
            res.render('user/cakes', {
                pageTitle: 'Add anything',
                genre: genre,
                path: '/user/pastries',
                pastries: _pastries,
                eventId: eventId,
                baker: baker,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken(),
                shop: true,
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getPastry = (req, res, next) => {
    const pastryId = req.params.cakeId;
    Cake.findById(pastryId)
        .then(cake => {
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
    const event =new Event({
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
    const baker = req.query.baker;
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
    const baker = req.query.baker;
    Event.findById(eventId)
        .populate('userId')
        .then(event => {
            if (!event) {
                res.redirect('/user');
            }
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

const obj = [];
const data = (cart) => {
    cart.map((i) => {
        let _baker = i.pastryId.baker.toString();
        if(obj[_baker] === undefined) {
            obj[_baker] = [i];
            } else {
                obj[_baker].push(i);  
            } 
        });
    return obj;
}

exports.getCart = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    const eventId = req.params.eventId;
    const baker = req.query.baker;
    Event.findById(eventId)
        .populate('cart.items.pastryId')
        .populate('userId')
        // .exec()
        .then(pastries => {
            let obj = {};
            let event = pastries;
            pastries = pastries.cart.items;
            const data = (cart) => {
                cart.map((i) => {
                    let _baker = i.pastryId.baker.toString();
                    if(obj[_baker] === undefined) {
                        obj[_baker] = [i];
                        } else {
                            obj[_baker].push(i);  
                        } 
                    });
                    return obj;
            }
            let bakers = data(pastries);
            return {event, bakers}
        })
        .then(resources => {
            res.render('user/eventCart', {
                pageTitle: resources.event.name,
                path: '/user/event-cart',
                event: resources.event,
                user: resources.event,
                pastries: resources.bakers,
                success: message,
                authenticated: req.session.loggedIn,
                csrfToken: req.csrfToken()
            })
        })
        .catch(err => {
            const error = new Error(err);
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
    const pastryId = req.query.pastryId;
    const eventId = req.params.eventId;
    Cake.findById(pastryId)
        .then(pastry => {
            Event.findById(eventId)
                .then(event => {
                    return event.addToCart(pastry);
                })
        })
        .then(result => {
            res.status(200).json({message: 'Success!'})
        })
        .catch(err => {
            res.status(500).json({message: 'Unsuccessful!'})
        })
};

exports.postSubCart = (req, res, next) => {
    const pastryId = req.query.pastryId;
    const eventId = req.params.eventId;
    console.log(eventId, 'Hello', pastryId);
    Cake.findById(pastryId)
        .then(pastry => {
            Event.findById(eventId)
                .then(event => {
                    return event.subFromCart(pastry);
                })
        })
        .then(result => {
            res.status(200).json({message: 'Success!'})
        })
        .catch(err => {
            res.status(500).json({message: 'Unsuccessful!'})
        })
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
    const baker = req.body.baker;
    const totalAmount = req.body.totalAmount;
    let _notOrdered;
    let _pastries;
    Event.findById(eventId)
        .populate('cart.items.pastryId')
        .then(event => {
            const pastries = event.cart.items.map(i => {
               admin_id = i.pastryId.adminId;
                return {
                    quantity: i.quantity,
                    pastryId: {
                        ...i.pastryId._doc
                    }
                }
            });
            console.log(pastries);
            _pastries = pastries.filter((pastry) => pastry.pastryId.baker === baker);
            _notOrdered = pastries.filter((pastry) => pastry.pastryId.baker !== baker);
            Admin.findById(admin_id)
                .then(admin => {
                    admin_company = admin.name;
                    const order = new Order({
                        user: {
                            name: req.user.name,
                            telNo: req.user.telNo,
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
                            totalAmount: totalAmount,
                            baker: baker,
                        },
                        pastries: _pastries,
                        admin: {
                            adminCompany: baker,
                        },
                    });
                    return order.save();
                });
                return event;
            })
        .then(event => {
            return event.clearCart(_notOrdered);
        })
        .then(result => {
            req.flash('success', 'Order successfully placed.')
            res.redirect('/user/orders');
        })
        .catch(err => {
            const error = new Error(err);
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
        console.log(errors)
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
            if (Image &&  user.image) {
                fileHelper.deleteFile(user.image);
                user.image = Image.path;
            } else if (Image) {
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