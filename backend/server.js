require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const wineRoutes = require('./routes/wineRoutes');

const app = express();

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected to db');
}).catch(err => {
    console.error('Error connecting to MongoDB', err);
});

app.use(express.json());
app.use('/api', wineRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
