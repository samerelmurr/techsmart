const express = require('express');
const inventoryLogController = require('../Controllers/inventoryLogController');
const router = express.Router();

// Get all inventory logs
router.get('/', inventoryLogController.getAllInventoryLogs);

// Get inventory log by ID
router.get('/:logId', inventoryLogController.getInventoryLogById);

// Add a new inventory log
router.post('/', inventoryLogController.addInventoryLog);

// Get logs for a specific product
router.get('/product/:productId', inventoryLogController.getLogsForProduct);

module.exports = router;
