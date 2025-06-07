const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const sessionRoutes = require('./src/routes/sessions');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');
const rateLimiter = require('./src/middleware/rateLimiter');
const dotenv = require('dotenv');


dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(rateLimiter);
app.use(cors());
app.use(express.json());
connectDB();

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/sessions', sessionRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});