const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

const createOrder = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const newOrder = await prisma.order.create({
      data: { 
        userId: parseInt(userId), 
        productId: parseInt(productId), 
        quantity: parseInt(quantity) || 1
      },
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create order' });
  }
};

module.exports = { getOrders, createOrder };
