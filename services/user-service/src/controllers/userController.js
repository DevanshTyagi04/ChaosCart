const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');

const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json(users);
  } catch (error) {
    logger.error({ err: error, operation: 'getUsers', reqId: req.id }, 'Error fetching users');

    res.status(500).json({
      error: 'Failed to fetch users',
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    logger.error({ err: error, operation: 'getUserById', id: req.params.id, reqId: req.id }, 'Error fetching user');

    res.status(500).json({
      error: 'Failed to fetch user',
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        error: 'Name and email are required',
      });
    }

    const newUser = await prisma.user.create({
      data: { name, email },
    });

    logger.info({ userId: newUser.id, operation: 'createUser', reqId: req.id }, 'User created successfully');
    res.status(201).json(newUser);
  } catch (error) {
    logger.error({ err: error, operation: 'createUser', name: req.body.name, email: req.body.email, reqId: req.id }, 'Error creating user');

    res.status(500).json({
      error: 'Failed to create user',
    });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};