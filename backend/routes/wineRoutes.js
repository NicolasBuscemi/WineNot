const express = require('express');
const router = express.Router();
const Wine = require('../models/wineModel');

// Create a new wine
router.post('/reviews', async (req, res) => {
    try {
        const wine = new Wine(req.body);
        await wine.save();
        res.status(201).send(wine);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all wines
router.get('/reviews', async (req, res) => {
    try {
        const wines = await Wine.find({});
        res.send(wines);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Read a single wine by ID
router.get('/reviews/:id', async (req, res) => {
    try {
        const wine = await Wine.findById(req.params.id);
        if (!wine) {
            return res.status(404).send();
        }
        res.send(wine);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a wine by ID
router.patch('/reviews/:id', async (req, res) => {
    try {
        const wine = await Wine.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!wine) {
            return res.status(404).send();
        }
        res.send(wine);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a wine by ID
router.delete('/reviews/:id', async (req, res) => {
    try {
        const wine = await Wine.findByIdAndDelete(req.params.id);
        if (!wine) {
            return res.status(404).send();
        }
        res.send(wine);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;