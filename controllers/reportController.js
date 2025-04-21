const { Op } = require('sequelize');
const Customer = require('../models/costumer'); // using the filename "costumer.js"
const Activity = require('../models/activity');

exports.getInactiveCustomers = async (req, res) => {
    try {
        // Calculate cutoff date (30 days ago)
        const cutoffDate = new Date();
        cutoffDate.setDate(cutoffDate.getDate() - 30);

        // Build base query: by user role
        const customerQuery = {};
        if (req.user.role === 'seller') {
            customerQuery.userId = req.user.id;
        }

        // Fetch all customers (admin: all, seller: only own)
        const allCustomers = await Customer.findAll({ where: customerQuery });

        // Get customer IDs with activity in the last 30 days
        const recentActivities = await Activity.findAll({
            where: {
                date: { [Op.gte]: cutoffDate }
            },
            attributes: ['customerId'],
            group: ['customerId']
        });
        const activeCustomerIds = recentActivities.map(activity => activity.customerId);

        // Filter out customers with recent activity
        const inactiveCustomers = allCustomers.filter(customer => !activeCustomerIds.includes(customer.id));

        res.json({ inactiveCustomers });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching inactive customers', error: error.message });
    }
};