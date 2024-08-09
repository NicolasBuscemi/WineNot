require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const wineRoutes = require('./routes/wineRoutes');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wineReviewRoutes = require('./routes/wineReviewRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/api', wineRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wine-reviews', wineReviewRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.use((req, res, next) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

mongoose.connect(process.env.MONGO_URI, {
  
}).then(() => {
    console.log('MongoDB connected to db');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
