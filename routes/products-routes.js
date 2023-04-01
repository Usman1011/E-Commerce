const express = require('express');
const router = express.Router();
const {ProductController} = require('../controllers/product.controller');
const {userAuthorizationMiddleWare, isUserAdmin} = require('../middlewares/authorization');

const productController = new ProductController();

router.get(`/getproducts`, productController.getAllProducts);

router.post(`/addproduct`, userAuthorizationMiddleWare, isUserAdmin, productController.addProduct);

router.post(`/getproduct`, productController.getProductById);

router.get('/getAllCategories', productController.getAllCategories);

router.get('/getProductsFromCategory', productController.getProductsFromCategories);

router.post('/buyProduct', userAuthorizationMiddleWare, productController.buyProducts);

router.post('/addtocart', userAuthorizationMiddleWare, productController.addToCart);

router.get('/mycart', userAuthorizationMiddleWare, productController.getCart)



module.exports = router;