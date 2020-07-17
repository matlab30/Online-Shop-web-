const path = require('path');

const express = require('express');

//const rootDir = require('../util/path');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin//add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin//products => GET
router.get('/products', adminController.getProducts);

// /admin//add-product => POST
router.post('/add-product', adminController.postAddProduct);

// // /admin//edit-product/id => GET
router.get('/edit-product/:productId', adminController.getEditProduct);

// // /admin//edit-product/id => POST
router.post('/edit-product', adminController.postEditProduct);

// // /admin//delete-product => POST
router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;

