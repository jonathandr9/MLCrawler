const routes = require('express').Router();
const ProductsController =require('../src/controllers/products.controller') ;

routes.post('/findProds', ProductsController.searchProducts);

module.exports = routes;