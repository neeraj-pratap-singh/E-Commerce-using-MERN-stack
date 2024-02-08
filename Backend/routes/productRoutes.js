const express = require('express');
const { addProduct, getProducts, getProductById, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

router.post('/new', addProduct);
router.get('/products', getProducts);
router.post('/new', addProduct);
router.get('/:id', getProductById);
router.get('/category/:category', getProductsByCategory);


module.exports = router;
