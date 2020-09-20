const express = require('express');

const router = express.Router();

const userRoute = require('../controllers/user');

const isAuth = require('../middleware/isAuth');

const { body } = require('express-validator');

router.get('/', isAuth, userRoute.getUser);

router.get('/cakes/:eventId', userRoute.getBds);

router.get('/vals/:eventId', userRoute.getVals);

router.get('/pans/:eventId', userRoute.getPans);

router.get('/cups/:eventId', userRoute.getCups);

router.get('/dons/:eventId', userRoute.getDons);

router.get('/weds/:eventId', userRoute.getWeds);

router.get('/cookies/:eventId', userRoute.getCookies);

router.get('/add-event', isAuth, userRoute.getAddEvent);

router.post('/add-event', [
    body('name', 'Name is too short')
    .isString()
    .isLength({
        min: 5
    })
    .trim(),
    body('purpose', 'Purpose is too short')
    .isString()
    .isLength({
        min: 4
    })
    .trim(),
    body('location', 'Please set a valid location')
    .isString()
    .isLength({
        min: 5,
        max: 20
    })
    .trim(),
    body('day', 'Please set the day')
    .isString()
    .trim(),
    body('month', 'Please set the month')
    .isString()
    .trim(),
    body('year', 'Please set the year')
    .isString()
    .trim(),
    body('period', 'Please set the period')
    .isString()
    .trim(),
    body('hour', 'Please set the hour')
    .isString()
    .trim(),
    body('minute', 'Please set the minute')
    .isString()
    .trim()
], isAuth, userRoute.postAddEvent);

router.get('/pastry-detail/:cakeId', userRoute.getPastry);

router.get('/edit-event/:eventId', userRoute.getEditEvent);

router.post('/edit-event', [
    body('name', 'Name is too short')
    .isString()
    .isLength({
        min: 5
    })
    .trim(),
    body('purpose', 'Purpose is too short')
    .isString()
    .isLength({
        min: 4
    })
    .trim(),
    body('location', 'Please set a valid location')
    .isString()
    .isLength({
        min: 5,
        max: 20
    })
    .trim(),
    body('day', 'Please set the day')
    .isString()
    .trim(),
    body('month', 'Please set the month')
    .isString()
    .trim(),
    body('year', 'Please set the year')
    .isString()
    .trim(),
    body('period', 'Please set the period')
    .isString()
    .trim(),
    body('hour', 'Please set the hour')
    .isString()
    .trim(),
    body('minute', 'Please set the minute')
    .isString()
    .trim()
], isAuth, userRoute.postEditEvent);

router.get('/delete-event/:eventId', userRoute.getDeleteEvent);

router.get('/edit-profile/:userId', userRoute.getEditForm);

router.post('/edit-profile', userRoute.postEditProfile)

router.get('/orders', isAuth, userRoute.getOrders);

router.post('/delete-event', isAuth, userRoute.postDeleteEvent);

router.post('/add-to-event', isAuth, userRoute.postAddCart);

router.post('/sub-from-event', isAuth, userRoute.postSubCart);

router.get('/event-cart/:eventId', isAuth, userRoute.getCart);

router.post('/cart-delete', isAuth, userRoute.postCartDelete);

router.post('/make-order', isAuth, userRoute.postOrder);

router.get('/orders/:orderId', isAuth, userRoute.getDetails);



module.exports = router;