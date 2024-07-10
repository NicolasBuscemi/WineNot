const Wine = require('../models/Wine');

// Create a new Wine
exports.createWine = async (req, res) => {
  try {
    const newWine = new Wine(req.body);
    await newWine.save();
    res.status(201).send(newWine);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all Wines
exports.getAllWines = async (req, res) => {
  try {
    const wines = await Wine.find();
    res.status(200).send(wines);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a single Wine by ID
exports.getWineById = async (req, res) => {
  try {
    const wine = await Wine.findById(req.params.id);
    if (!wine) {
      return res.status(404).send();
    }
    res.status(200).send(wine);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a Wine by ID
exports.updateWineById = async (req, res) => {
  try {
    const wine = await Wine.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!wine) {
      return res.status(404).send();
    }
    res.status(200).send(wine);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a Wine by ID
exports.deleteWineById = async (req, res) => {
  try {
    const wine = await Wine.findByIdAndDelete(req.params.id);
    if (!wine) {
      return res.status(404).send();
    }
    res.status(200).send(wine);
  } catch (error) {
    res.status(500).send(error);
  }
};