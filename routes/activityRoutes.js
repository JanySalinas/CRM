const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const activityController = require('../controllers/activityController');

// POST /api/activities: Create a new activity
router.post('/', verifyToken, activityController.createActivity);

// GET /api/activities/customer/:id: Get all activities for a specific customer
router.get('/customer/:id', verifyToken, activityController.getActivitiesByCustomerId);

// GET /api/activities?customerId=123
router.get('/', verifyToken, activityController.getActivitiesByCustomer);

module.exports = router;