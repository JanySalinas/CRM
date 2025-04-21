const Activity = require('../models/activity');

exports.getActivitiesByCustomer = async (req, res) => {
  // This function handles GET /api/activities?customerId=123
  const customerId = req.query.customerId;
  if (!customerId) {
    return res.status(400).json({ message: 'customerId query parameter is required' });
  }
  try {
    const activities = await Activity.findAll({ where: { customerId } });
    res.json({ activities });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getActivitiesByCustomerId = async (req, res) => {
  // This function handles GET /api/activities/customer/:id
  const customerId = req.params.id;
  try {
    const activities = await Activity.findAll({ where: { customerId } });
    res.json({ activities });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createActivity = async (req, res) => {
    try {
      // Set userId from the token data (assuming your verifyToken middleware attaches req.user)
      req.body.userId = req.user.id;
      const newActivity = await Activity.create(req.body);
      res.json(newActivity);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };