const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const USER_SERVICE_URL =
  process.env.USER_SERVICE_URL || 'http://user-service:4001';

const PRODUCT_SERVICE_URL =
  process.env.PRODUCT_SERVICE_URL || 'http://product-service:4002';

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    logger.error({ err: error, operation: 'getOrders', reqId: req.id }, 'Error fetching orders');

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
      logger.warn({ err: error, operation: 'createOrder_verifyUser', userId, reqId: req.id }, 'User verification failed');
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
      logger.warn({ err: error, operation: 'createOrder_verifyProduct', productId, reqId: req.id }, 'Product verification failed');
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

    logger.info({ orderId: newOrder.id, userId, productId, operation: 'createOrder', reqId: req.id }, 'Order created successfully');
    res.status(201).json(newOrder);
  } catch (error) {
    logger.error({ err: error, operation: 'createOrder', userId: req.body.userId, productId: req.body.productId, reqId: req.id }, 'Error creating order');

    res.status(500).json({
      error: 'Failed to create order',
    });
  }
};

module.exports = { getOrders, createOrder };