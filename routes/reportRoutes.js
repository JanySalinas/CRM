const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const reportController = require('../controllers/reportController');

// GET /api/reports/inactive-customers: Get all inactive customers (no activity in past 30 days)
router.get('/inactive-customers', verifyToken, reportController.getInactiveCustomers);

module.exports = router;