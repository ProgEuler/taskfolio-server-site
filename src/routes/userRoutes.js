const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:email', userController.getUserByEmail);
router.patch('/:email', userController.updateUserByEmail);
router.post('/', userController.createUser);

module.exports = router;
