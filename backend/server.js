const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();  // Load environment variables

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected to db'))
  .catch(err => console.log('Error connecting to MongoDB', err));

// Wine Schema
const wineSchema = new mongoose.Schema({
  name: String,
  year: Number,
  grapes: String,
  country: String,
  description: String
});

const Wine = mongoose.model('Wine', wineSchema);

// POST route to create a new wine
app.post('/wines', async (req, res) => {
  console.log('POST /wines', req.body);  // Debugging log
  try {
    const wine = new Wine(req.body);
    await wine.save();
    res.status(201).send(wine);
  } catch (error) {
    console.error('Error creating wine:', error);
    res.status(400).send(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
