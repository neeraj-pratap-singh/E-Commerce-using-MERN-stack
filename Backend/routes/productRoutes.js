const express = require('express');
const { addProduct, getProducts, getProductById, getProductsByCategory } = require('../controllers/productController');

const router = express.Router();

// Endpoint to add a new product
router.post('/new', addProduct);

// Endpoint to get a list of all products
router.get('/products', getProducts);

// Endpoint to get a product by its ID
// Note: This needs to be adjusted to avoid conflict with '/category/:category'
router.get('/by-id/:id', getProductById);

// Endpoint to get products by category
router.get('/by-category/:category', getProductsByCategory);

module.exports = router;
