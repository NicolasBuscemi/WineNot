require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const wineRoutes = require('./routes/wineRoutes');
const userRoutes = require('./routes/userRoutes');  
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const corsOptions = {
    origin: 'http://127.0.0.1:5500', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api', wineRoutes);
app.use('/api/users', userRoutes);  
app.use('/api/reviews', reviewRoutes);

// Catch-all route for undefined endpoints
app.use((req, res, next) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// MongoDB connection
console.log('MONGO_URI:', process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected to db');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
