const express = require('express');

const {
    getUsers,
    getUserById,
    createUser,
} = require('../controllers/userController');

const router = express.Router();

// Get all users
router.get('/', getUsers);

// Get single user by ID
router.get('/:id', getUserById);

// Create user
router.post('/', createUser);

module.exports = router;