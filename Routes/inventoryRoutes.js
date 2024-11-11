const express = require('express');
const router = express.Router();
const inventoryController = require('../Controllers/inventoryController');

// Get all inventory items
router.get('/', inventoryController.getAllInventoryItems);

// Get a specific inventory item
router.get('/:productId', inventoryController.getInventoryItemById);

// Add a new inventory item
router.post('/', inventoryController.addInventoryItem);

// Update an inventory item
router.put('/:productId', inventoryController.updateInventoryItem);

// Delete an inventory item
router.delete('/:productId', inventoryController.deleteInventoryItem);

module.exports = router;
