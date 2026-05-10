const { PrismaClient } = require('@prisma/client');
const axios = require('axios');

const prisma = new PrismaClient();

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://localhost:4001';

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://localhost:4002';

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);

    res.status(500).json({
      error: 'Failed to fetch orders',
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    // Validate required fields
    if (!userId || !productId) {
      return res.status(400).json({
        error: 'userId and productId are required',
      });
    }

    // Verify user exists
    try {
      await axios.get(
        `${USER_SERVICE_URL}/api/users/${userId}`
      );
    } catch (error) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    // Verify product exists
    try {
      await axios.get(
        `${PRODUCT_SERVICE_URL}/api/products/${productId}`
      );
    } catch (error) {
      return res.status(404).json({
        error: 'Product not found',
      });
    }

    // Create order
    const newOrder = await prisma.order.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        quantity: parseInt(quantity) || 1,
      },
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);

    res.status(500).json({
      error: 'Failed to create order',
    });
  }
};

module.exports = { getOrders, createOrder };