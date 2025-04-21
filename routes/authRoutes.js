const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');

// For registration, do not use verifyToken middleware so that the first admin can register without a token.
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').isIn(['admin', 'seller']).withMessage('Role must be either admin or seller')
    ],
    authController.register
  );
console.log("authController.register:", authController.register);

// Login route remains unprotected.
router.post('/login', 
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required')
    ],
    authController.login
);

module.exports = router;