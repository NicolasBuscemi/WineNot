const express = require('express');
const router = express.Router();
const wineController = require('../controllers/wineController');

// Create a new Wine
router.post('/wines', wineController.createWine);

// Get all Wines
router.get('/wines', wineController.getAllWines);

// Get a single Wine by ID
router.get('/wines/:id', wineController.getWineById);

// Update a Wine by ID
router.put('/wines/:id', wineController.updateWineById);

// Delete a Wine by ID
router.delete('/wines/:id', wineController.deleteWineById);

module.exports = router;