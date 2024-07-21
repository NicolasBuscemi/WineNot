const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const wineRoutes = require('./routes/wineRoutes');

const app = express();
const PORT = 3001;

// Middleware
const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'], // Allow required methods
};

app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use('/api', wineRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => {
  console.log('MongoDB connected to db');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
