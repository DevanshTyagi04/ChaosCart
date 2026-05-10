const express = require('express');

const {
    getProducts,
    getProductById,
    createProduct,
} = require('../controllers/productController');

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create product
router.post('/', createProduct);

module.exports = router;