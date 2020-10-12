const getAdminRoutes = require('../controllers/admin');
const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

router.get('/', getAdminRoutes.getIndex);
router.get('/general', getAdminRoutes.getGeneral);
// // router.get('/bamenda', getAdminRoutes.getBdaClients);
router.get('/create', getAdminRoutes.getCreateAdmin);

router.get('/cakes', getAdminRoutes.getBds);

router.get('/cookies', getAdminRoutes.getCookie);

router.get('/pans', getAdminRoutes.getPans);

router.get('/weds', getAdminRoutes.getWeds);

router.get('/cups', getAdminRoutes.getCups);

router.get('/vals', getAdminRoutes.getVal);

router.get('/dons', getAdminRoutes.getDons);

router.get('/pastry/:pastryId', getAdminRoutes.getCake);

router.get('/addpastry', getAdminRoutes.getPastry);

router.get('/add-cookies', getAdminRoutes.getAddCookie);

router.get('/add-pans', getAdminRoutes.getAddPan);

router.get('/add-weds', getAdminRoutes.getAddWeds);

router.get('/add-cups', getAdminRoutes.getAddCup);

router.get('/add-dons', getAdminRoutes.getAddDon);

router.get('/add-vals', getAdminRoutes.getAddVal);

router.get('/orders', getAdminRoutes.getOrders);

router.get('/users', getAdminRoutes.getAllUsers);

router.get('/users', getAdminRoutes.getAllUsers);

router.get('/admins', getAdminRoutes.getAllAdmins);

router.get('/all-orders', getAdminRoutes.getAllOrders);

router.get('/orders/:orderId', getAdminRoutes.getClientOrder);

router.post('/add-pastry', [
    body('name', 'Please enter a valid name')
    .isString()
    .isLength({
        min: 5
    })
    .trim(),
    body('price', 'Please enter a valid price')
    .isNumeric(),
    body('desc', 'Please enter a longer description').isLength({ min: 10, max: 1000 }).trim()
], getAdminRoutes.postAddPastry);

router.post('/edit-pastry', [
    body('name', 'Please enter a valid name')
    .isString()
    .isLength({
        min: 5
    })
    .trim(),
    body('price', 'Please enter a valid price')
    .isNumeric(),
    body('desc').isLength({ min: 10, max: 1000 }).trim()
], getAdminRoutes.postEditPastry);

router.get('/edit-pastry/:pastryId', getAdminRoutes.getEditPastry);


router.get('/delete-pastry/:pastryId', getAdminRoutes.getDeletePastry);

router.post('/delete-pastry', getAdminRoutes.postDeletePastry);

router.post('/create', getAdminRoutes.postCreateAdmin);

router.post('/signIn', getAdminRoutes.postSignIn);
router.post('/logout', getAdminRoutes.postLogout);



module.exports = router;