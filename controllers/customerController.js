const Customer = require('../models/costumer'); // Using the filename "costumer.js"

// Controller for listing customers:
// - Admin: list all customers
// - Seller: list only own customers
exports.getCustomers = async (req, res) => {
    try {
        let customers;
        if (req.user.role === 'admin') {
            // Admin sees all customers
            customers = await Customer.findAll();
        } else {
            // Seller sees only customers they own
            customers = await Customer.findAll({ where: { userId: req.user.id } });
        }
        res.json({ customers });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customers', error: err.message });
    }
};

// Controller for getting a single customer by ID
exports.getCustomerById = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        // Sellers may only access their own customers
        if (req.user.role === 'seller' && customer.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        res.json({ customer });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching customer', error: err.message });
    }
};

// Controller for creating a new customer
exports.createCustomer = async (req, res) => {
    try {
        const { name, email, phone, address, lastContacted } = req.body;
        // If the user is a seller, force userId to the seller's id; admins can optionally pass a userId
        const userId = req.user.role === 'seller' ? req.user.id : req.body.userId || req.user.id;
        const customer = await Customer.create({ name, email, phone, address, lastContacted, userId });
        res.status(201).json({ message: 'Customer created successfully', customer });
    } catch (err) {
        res.status(500).json({ message: 'Error creating customer', error: err.message });
    }
};

// Controller for updating an existing customer
exports.updateCustomer = async (req, res) => {
    try {
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }
        // Sellers can update only their own customers
        if (req.user.role === 'seller' && customer.userId !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }
        const { name, email, phone, address, lastContacted } = req.body;
        await customer.update({ name, email, phone, address, lastContacted });
        res.json({ message: 'Customer updated successfully', customer });
    } catch (err) {
        res.status(500).json({ message: 'Error updating customer', error: err.message });
    }
};

// Controller for deleting a customer (admin only)
exports.deleteCustomer = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }
        const customerId = req.params.id;
        const customer = await Customer.findByPk(customerId);
        if (!customer) {
            return res.status(404).json({ message: 'Customer not found' });
        }

        // Delete activities first
        await Activity.destroy({ where: { customerId } });

        // Then delete the customer
        await customer.destroy();
        res.json({ message: 'Customer and related activities deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting customer', error: err.message });
    }
};