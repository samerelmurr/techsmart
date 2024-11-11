const inventoryLogService = require('../Services/inventoryLogService'); // Import inventory log service functions

// Get all inventory logs
// Retrieves all inventory logs from the database and returns them in the response
// If no logs are found, responds with a 404 status and an error message
// Otherwise, responds with a 200 status and the list of logs
async function getAllInventoryLogs(req, res) {
    try {
        const logs = await inventoryLogService.getAllInventoryLogs();
        if (!logs.length) return res.status(404).json({ error: 'No inventory logs found' });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get inventory log by ID
// @param {number} logId - ID of the inventory log to retrieve
// Retrieves a specific inventory log by its ID and returns it in the response
// If the log is not found, responds with a 404 status and an error message
// Otherwise, responds with a 200 status and the log details
async function getInventoryLogById(req, res) {
    try {
        const log = await inventoryLogService.getInventoryLogById(req.params.logId);
        if (!log) return res.status(404).json({ error: 'No inventory log found with this ID' });
        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new inventory log
// @param {Object} req.body - Contains the details of the inventory log to add (e.g., product_id, quantity_change, action_type)
// Adds a new inventory log entry to the database and returns the created log
// Responds with a 201 status and the new log's details
async function addInventoryLog(req, res) {
    try {
        const newLog = await inventoryLogService.addInventoryLog(req.body);
        res.status(201).json(newLog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get inventory logs for a specific product
// @param {number} productId - ID of the product to retrieve logs for
// Retrieves all logs related to a specific product ID and returns them in the response
// If no logs are found for the product, responds with a 404 status and an error message
// Otherwise, responds with a 200 status and the list of logs
async function getLogsForProduct(req, res) {
    try {
        const logs = await inventoryLogService.getLogsForProduct(req.params.productId);
        if (!logs.length) return res.status(404).json({ error: 'No logs found for this product' });
        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Export all functions for use in route handlers
module.exports = {
    getAllInventoryLogs,
    getInventoryLogById,
    addInventoryLog,
    getLogsForProduct
};
