const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();

    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);

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
    console.error('Error fetching product:', error.message);

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

    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);

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