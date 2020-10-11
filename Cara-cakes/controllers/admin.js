const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Cake = require('../models/product');
const Admin = require('../models/admin');
const Orders = require('../models/orders');
const Users = require('../models/user');
const fileHelper = require('../util/file');




exports.getIndex = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('admin/index', {
        pageTitle: 'Welcome Admin',
        path: '/admin',
        bodyType: 'admin__center back-admin',
        errorMessage: message
    });
}

exports.getCreateAdmin = (req, res, next) => {
    let message = req.flash('error');
    if(message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {

    res.render('admin/admin-create', {
        pageTitle: "Create New Admin",
        path: 'admin/create',
        authenticated: false,
        errorMessage: message,
        validationErrors: [],
        oldInput: {
            name: "",
            user_name: "",
            password: "",
            conPassword: "",
        },
        admin:admin,
    })
    })
}

exports.postCreateAdmin = (req, res, next) => {
    const company_name = req.body.name;
    const user_name = req.body.user_name;
    const password = req.body.password;
    const type = req.body.type;
    const conPassword = req.body.conPassword;
    const image = req.file;
    let imagePath = "";

    console.log('I reached here');
    
    if (image) {
       imagePath = image.path;
    }

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.log(errors.array(), 'ok');
        return res.status(422).render('admin/admin-create', {
            pageTitle: 'Create New Admin',
            path: 'admin/create',
            authenticated: false,
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            oldInput: {
                name: name,
                user_name: user_name,
                password: "",
                conPassword: "",
            }
        })
    }
    bcrypt.hash(password, 12)
        .then(hashedPassword => {
            const newAdmin = new Admin({
                name: company_name,
                password: hashedPassword,
                user_name: user_name,
                type: type,
                image: imagePath,
            });
            return newAdmin.save();
        })
        .then(result => {
            return res.redirect('/admin');
        })
        .catch(err => {
            const error = new Error(err);
            return next(error);
        })
   
}

exports.postSignIn = (req, res, next) => {
    const user_name = req.body.user;
    const password = req.body.password;

    Admin.findOne({
            user_name: user_name
        })
        .then(admin => {
            if (!admin) {
                req.flash('error', 'Invalid credentials, Please try again.');
                return res.redirect('/admin');
            }
        bcrypt.compare(password, admin.password)
            .then(doMatch => {
                let name = admin.name;
                let message = 'Welcome, Mr ' + name;
                if (doMatch) {
                    req.session.signedIn = true;
                    req.session.admin = admin;
                    return req.session.save(err => {
                        console.log(err);
                        req.flash('success', message);
                        res.redirect('/admin/general');
                    });
                }
                req.flash('error', 'Invalid credentials, please try again.');
                res.redirect('/admin');
            })
            .catch(err => {
            console.log("One");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
})
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/admin');
    })
}

exports.getGeneral = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
            name: req.session.admin.name
        })
        .then(admin => {
            let title = 'Welcome ' + admin.name;
            console.log(admin)
            res.render('admin/general', {
                pageTitle: title,
                path: '/admin/general',
                editing: false,
                success: message,
                admin: admin
            });
        })
        .catch(err => {
            console.log("two");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getBds = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Birthday-cake'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Birthday cakes',
                path: '/admin/cakes',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
        })
        .catch(err => {
            console.log("three");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getWeds = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Wedding-cake'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Wedding cakes',
                path: '/admin/weds',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("Four");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getCookie = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Cookie'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Cookies',
                path: '/admin/cookies',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("Five");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getPans = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Pancake'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Pancakes',
                path: '/admin/pans',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("Six");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getDons = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Doughnuts'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Doughnuts',
                path: '/admin/dons',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("seven");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getCups = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Cupcake'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Cupcakes',
                path: '/admin/cups',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("Eigth");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getVal = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.find({
            genre: 'Valentine'
        })
        .then(cakes => {
            res.render('admin/admin-products', {
                pageTitle: 'Your Valentine gifts',
                path: '/admin/vals',
                pastries: cakes,
                success: message,
                admin: admin
            });
        })
    })
        .catch(err => {
            console.log("nine");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}


exports.getCake = (req, res, next) => {
    const pastryId = req.params.pastryId;
    
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.findById(pastryId)
        .then(cake => {
            console.log(cake)
            res.render('admin/admin-detail', {
                pageTitle: cake.name,
                path: '/admin/pastry',
                pastry: cake,
                editing: false,
                admin: admin,
            });
        })
    })
        .catch(err => {
            console.log("Ten")
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}

exports.getBdaClients = (req, res, next) => {
    res.render('admin/bdaClients', {
        pageTitle: 'Bamenda Clients',
        path: '/admin/bamenda',

    });
}

exports.getAddBds = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Birthday Cake',
        path: '/admin/add-bds',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        pastry: {
            name: '',
            price: '',
            img: '',
            desc: '',
            type: ''
        },
        validationErrors: null,
        admin: admin
        
    });
})
}

exports.getAddWeds = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Wedding Cake',
        path: '/admin/add-weds',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin,
    });
})
}

exports.getAddDon = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Doughnuts',
        path: '/admin/add-dons',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin,
    });
})
}

exports.getAddCookie = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Cookie',
        path: '/admin/add-cookies',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin,
    });
})
}

exports.getAddPan = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Pancake',
        path: '/admin/add-pans',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin,
    });
})
}

exports.getAddVal = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Valentine Gifts',
        path: '/admin/add-vals',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin,
    });
})
}

exports.getAddCup = (req, res, next) => {
    let message = req.flash('success');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    res.render('admin/updates', {
        pageTitle: 'Add Cupcake',
        path: '/admin/add-cups',
        editing: false,
        success: message,
        hasError: false,
        errorMessage: null,
        validationErrors: null,
        admin: admin
    });
})
}

exports.postAddPastry = (req, res, next) => {
    let path;
    const name = req.body.name;
    const price = req.body.price;
    const img = req.file;
    const desc = req.body.desc;
    const type = req.body.type;
    const errors = validationResult(req);

    if (type == 'Birthday-cake') {
        path = '/admin/add-bds'
    } else if (type == 'Wedding-cake') {
        path = '/admin/add-weds';
    } else if (type == 'Doughnuts') {
        path = '/admin/add-dons';
    } else if (type == 'Cupcake') {
        path = '/admin/add-cups';
    } else if (type == 'Cookie') {
        path = '/admin/add-cookies';
    } else if (type == 'Valentine') {
        path = '/admin/add-vals';
    } else if (type == 'Pancake') {
        path = '/admin/add-pans';
    }

    if (!img) {
        return res.status(422).render('admin/updates', {
            pageTitle: 'Add Pastry',
            path: path,
            editing: false,
            hasError: true,
            success: false,
            pastry: {
                name: name,
                price: price,
                description: desc,
                type: type
            },
            errorMessage: 'Attached file is not an image (png, jpg,jpeg)',
            validationErrors: []
        });
    }

    const imagePath = img.path;

    if (!errors.isEmpty()) {
        console.log("Again");
        Admin.findOne({
            name: req.session.admin.name
        }).then(admin => {
        return res.status(422).render('admin/updates', {
            pageTitle: 'Add Pastry',
            path: path,
            editing: false,
            hasError: true,
            success: false,
            pastry: {
                name: name,
                price: price,
                description: desc,
                genre: type,
                image: img
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            admin: admin,
        });
    })
    }


    const product = new Cake({
        name: name,
        price: price,
        image: imagePath,
        description: desc,
        genre: type,
        adminId: req.admin
    });


    product
        .save()
        .then(result => {
            req.flash('success', 'Pastry successfully added.')
            res.redirect(path);
        })
        .catch(err => {
            console.log("eleven");
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })

};


exports.getEditPastry = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/admin');
    }
    const cakeId = req.params.pastryId;
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.findById(cakeId)
        .then(cake => {
            if (!cake) {
                return res.redirect('/');
            }
            res.render('admin/updates', {
                pageTitle: 'Edit Birthday cake',
                path: '/admin/edit-pastry',
                editing: editMode,
                pastry: cake,
                hasError: false,
                errorMessage: null,
                validationErrors: null,
                admin: admin,
            });
        })
        })
}




exports.postEditPastry = (req, res, next) => {
    let path;
    const type = req.body.type;
    const pastryId = req.body.pastryId;
    const updatedName = req.body.name;
    const updatedPrice = req.body.price;
    const image = req.file;
    const updatedDesc = req.body.desc;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        Admin.findOne({
            name: req.session.admin.name
        }).then(admin => {
        return res.status(422).render('admin/updates', {
            pageTitle: 'Edit Pastry',
            path: '/admin/edit-pastry',
            editing: true,
            hasError: true,
            pastry: {
                name: updatedName,
                price: updatedPrice,
                description: updatedDesc,
                genre: type,
                _id: pastryId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array(),
            admin: admin,
        });
    })
    }

    if (type == 'Birthday-cake') {
        path = '/admin/cakes'
    } else if (type == 'Wedding-cake') {
        path = '/admin/weds';
    } else if (type == 'Doughnuts') {
        path = '/admin/dons';
    } else if (type == 'Cupcake') {
        path = '/admin/cups';
    } else if (type == 'Cookie') {
        path = '/admin/cookies';
    } else if (type == 'Valentine') {
        path = '/admin/vals';
    } else if (type == 'Pancake') {
        path = '/admin/pans';
    }

    Cake.findById(pastryId)
        .then(cake => {
            cake.name = updatedName;
            if (image) {
                fileHelper.deleteFile(cake.image);
                cake.image = image.path;
            }
            cake.price = updatedPrice;
            cake.description = updatedDesc;
            return cake.save()
        })
        .then(result => {
            res.redirect(path)
        })
        .catch(err => {
            console.log("Twelve")
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })

}

exports.getDeletePastry = (req, res, next) => {
    const pastryId = req.params.pastryId;
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Cake.findById(pastryId)
        .then(cake => {
            res.render('admin/admin-delete', {
                pageTitle: 'Deleting',
                path: '/admin/delete-pastry',
                pastry: cake,
                admin: admin,
            });
        })
        })
        .catch(err => {
            console.log("Thirteen")
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        })
}



exports.postDeletePastry = (req, res, next) => {
    const pastryId = req.body.pastryId;
    console.log(pastryId);
    Cake.findById(pastryId).then(pastry => {
            if (!pastry) {
                return next(new Error('Pastry not found.'));
            }
            fileHelper.deleteFile(pastry.image);
            return Cake.findByIdAndRemove(pastryId)
        })
        .then(result => {
            let type = result.genre;
            let path = '';
            if (type == 'Birthday-cake') {
                path = '/admin/cakes'
            } else if (type == 'Wedding-cake') {
                path = '/admin/weds';
            } else if (type == 'Doughnuts') {
                path = '/admin/dons';
            } else if (type == 'Cupcake') {
                path = '/admin/cups';
            } else if (type == 'Cookie') {
                path = '/admin/cookies';
            } else if (type == 'Valentine') {
                path = '/admin/vals';
            } else if (type == 'Pancake') {
                path = '/admin/pans';
            }
            req.flash('error', 'Pastry successfully deleted.')
            res.redirect(path);
        });
}


exports.getOrders = (req, res, next) => {
    
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
        Orders.find({admin: req.session.admin._id})
            .then(orders => {
                console.log(orders);
                res.render('admin/orders', {
                    pageTitle: 'All Orders',
                    path: '/admin/orders',
                    editing: false,
                    orders: orders,
                    admin: admin,
                })
            })
    })
}

exports.getAllOrders = (req, res, next) => {
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
        Orders.find()
            .then(orders => {
                    res.render('admin/orders', {
                        pageTitle: 'All Orders',
                        path: '/admin/orders',
                        editing: false,
                        orders: orders,
                        admin: admin,
                    });
            })
    })
}

exports.getClientOrder = (req, res, next) => {
    const orderId = req.params.orderId;
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Orders.findById(orderId)
        .populate('pastries.pastryId')
        .then(order => {
            console.log(order);
            let name = order.user.name + '\'s orders';
            res.render('admin/orders', {
                pageTitle: name,
                path: '/admin/client-order',
                editing: false,
                order: order,
                admin: admin
            })
        })
    })
}


exports.getAllUsers = (req, res, next) => {
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Users.find()
    .then(users => {
        console.log(users)
        res.render('admin/users', {
            pageTitle: 'All Users',
            path: 'admin/users',
            editing: false,
            users: users,
            admin: admin,
            errorMessage: [],
            hasError: false,
        })
    })
})
}

exports.getAllAdmins = (req, res, next) => {
    Admin.findOne({
        name: req.session.admin.name
    }).then(admin => {
    Admin.find()
    .then(admins => {
        console.log(admins)
        res.render('admin/admins', {
            pageTitle: 'All Users',
            path: 'admin/admins',
            editing: false,
            admins: admins,
            admin: admin,
            errorMessage: [],
            hasError: false,
        })
    })
})
}