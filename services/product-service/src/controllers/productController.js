const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    logger.error({ err: error, operation: 'getProducts', reqId: req.id }, 'Error fetching products');

    res.status(500).json({
      error: 'Failed to fetch products',
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!product) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }

    res.json(product);
  } catch (error) {
    logger.error({ err: error, operation: 'getProductById', id: req.params.id, reqId: req.id }, 'Error fetching product');

    res.status(500).json({
      error: 'Failed to fetch product',
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({
        error: 'Name and price are required',
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price),
      },
    });

    logger.info({ productId: newProduct.id, operation: 'createProduct', reqId: req.id }, 'Product created successfully');
    res.status(201).json(newProduct);
  } catch (error) {
    logger.error({ err: error, operation: 'createProduct', name: req.body.name, reqId: req.id }, 'Error creating product');

    res.status(500).json({
      error: 'Failed to create product',
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};