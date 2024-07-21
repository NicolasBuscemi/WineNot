const mongoose = require('mongoose');

const wineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2024,
  },
  type: {
    type: String,
    required: true,
    enum: ['white', 'red', 'rose', 'bubbles', 'dessert'],
  },
  region: {
    type: String,
    required: true,
    enum: ['Piemont', 'South Italy', 'Toscany', 'Spain', 'Bordeaux'],
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
});

const Wine = mongoose.model('Wine', wineSchema);

module.exports = Wine;
