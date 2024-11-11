const express = require('express');
const router = express.Router();
const inventoryOutOfStockController = require('../Controllers/inventoryOutOfStockController');

// Get all out-of-stock items
router.get('/', inventoryOutOfStockController.getAllOutOfStockItems);

// Get a specific out-of-stock item
router.get('/:productId', inventoryOutOfStockController.getOutOfStockItemById);

// Add a new out-of-stock item
router.post('/', inventoryOutOfStockController.addOutOfStockItem);

// Update an out-of-stock item
router.put('/:productId', inventoryOutOfStockController.updateOutOfStockItem);

// Delete an out-of-stock item
router.delete('/:productId', inventoryOutOfStockController.deleteOutOfStockItem);

module.exports = router;
