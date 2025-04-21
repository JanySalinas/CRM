require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./config/database');
const cors = require('cors');

// Import routes
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/costumerRoutes');
const activityRoutes = require('./routes/activityRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Serve static files from the 'frontend' folder
app.use(express.static(path.join(__dirname, 'frontend')));

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Public Authentication Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/customers', customerRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/reports', reportRoutes);

// (Optional) Example protected endpoint to test JWT authentication
const { verifyToken } = require('./middleware/authMiddleware');
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: `Hello user ${req.user.id}. Your role is ${req.user.role}.` });
});
app.get('/', (req, res) => {
    res.send('Welcome to the CRM API!');
});

// Test and sync database connection
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        // Sync models: remove "force" option in production!
        return sequelize.sync();
    })
    .then(() => console.log('Database synced, tables are ready'))
    .catch(err => console.error('Database connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));