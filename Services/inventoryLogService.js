// Import the database connection
const db = require('../db');

/**
 * Retrieve all inventory logs.
 * @returns {Promise<Array>} - An array of inventory log records.
 */
async function getAllInventoryLogs() {
    try {
        const [logs] = await db.query('SELECT * FROM InventoryLogs');
        return logs;
    } catch (error) {
        throw new Error('Error fetching inventory logs');
    }
}

/**
 * Retrieve an inventory log by its log ID.
 * @param {number} logId - The ID of the inventory log to fetch.
 * @returns {Promise<Object>} - The inventory log record matching the log ID.
 */
async function getInventoryLogById(logId) {
    try {
        const [logs] = await db.query('SELECT * FROM InventoryLogs WHERE log_id = ?', [logId]);
        return logs[0];
    } catch (error) {
        throw new Error('Error fetching inventory log by ID');
    }
}

/**
 * Add a new inventory log.
 * @param {Object} logBody - The details of the inventory log to add.
 * @param {number} logBody.product_id - The ID of the product related to the log.
 * @param {number} logBody.quantity_change - The quantity change for the product.
 * @param {string} logBody.action_type - The type of action (restock, sale, adjustment).
 * @returns {Promise<Object>} - The newly added inventory log, including the generated ID.
 */
async function addInventoryLog(logBody) {
    try {
        const { product_id, quantity_change, action_type } = logBody;
        const [result] = await db.query(
            'INSERT INTO InventoryLogs (product_id, quantity_change, action_type) VALUES (?, ?, ?)',
            [product_id, quantity_change, action_type]
        );
        return { id: result.insertId, product_id, quantity_change, action_type };
    } catch (error) {
        throw new Error('Error adding inventory log');
    }
}

/**
 * Retrieve logs for a specific product.
 * @param {number} productId - The ID of the product whose logs to fetch.
 * @returns {Promise<Array>} - An array of inventory logs for the specified product.
 */
async function getLogsForProduct(productId) {
    try {
        const [logs] = await db.query('SELECT * FROM InventoryLogs WHERE product_id = ?', [productId]);
        return logs;
    } catch (error) {
        throw new Error('Error fetching logs for product');
    }
}

// Export the functions for external use
module.exports = {
    getAllInventoryLogs,
    getInventoryLogById,
    addInventoryLog,
    getLogsForProduct
};
