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
// GET route to read a single wine by ID
app.get('/wines/:id', async (req, res) => {
    try {
        const wine = await Wine.findById(req.params.id); // Find wine by ID
        if (!wine) {
            return res.status(404).send({ message: 'Wine not found' }); // Handle not found
        }
        res.status(200).send(wine); // Send the wine data
    } catch (error) {
        res.status(500).send(error); // Handle any errors
    }
});
// PATCH route to update a wine by ID
app.patch('/wines/:id', async (req, res) => {
    try {
        const wine = await Wine.findByIdAndUpdate(req.params.id, req.body, { new: true }); // Update and return new wine
        if (!wine) {
            return res.status(404).send({ message: 'Wine not found' }); // Handle not found
        }
        res.status(200).send(wine); // Send the updated wine data
    } catch (error) {
        res.status(400).send(error); // Handle bad request errors
    }
});
// DELETE route to remove a wine by ID
app.delete('/wines/:id', async (req, res) => {
    try {
        const wine = await Wine.findByIdAndDelete(req.params.id); // Delete wine by ID
        if (!wine) {
            return res.status(404).send({ message: 'Wine not found' }); // Handle not found
        }
        res.status(200).send({ message: 'Wine deleted successfully' }); // Confirm deletion
    } catch (error) {
        res.status(500).send(error); // Handle any errors
    }
});

  
  
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
