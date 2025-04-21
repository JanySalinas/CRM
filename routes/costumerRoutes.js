const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const customerController = require('../controllers/customerController');

// GET /api/customers: List customers based on user role
router.get('/', verifyToken, customerController.getCustomers);

// GET /api/customers/:id: Get customer by ID
router.get('/:id', verifyToken, customerController.getCustomerById);

// POST /api/customers: Create a new customer
router.post('/', verifyToken, customerController.createCustomer);

// PUT /api/customers/:id: Update customer
router.put('/:id', verifyToken, customerController.updateCustomer);

// DELETE /api/customers/:id: Delete customer (admin only)
router.delete('/:id', verifyToken, customerController.deleteCustomer);

module.exports = router;