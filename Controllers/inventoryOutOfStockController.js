const inventoryOutOfStockService = require('../Services/inventoryOutOfStockService'); // Import service functions for out-of-stock inventory management

// Get all out-of-stock items
// Retrieves a list of all out-of-stock items from the database and returns it in the response
// Responds with a 200 status and the list of items
async function getAllOutOfStockItems(req, res) {
    try {
        const items = await inventoryOutOfStockService.getAllOutOfStockItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get a single out-of-stock item by ID
// @param {number} productId - ID of the out-of-stock item to retrieve
// Retrieves a specific out-of-stock item by its ID and returns it in the response
// Responds with a 404 status if the item is not found, otherwise returns a 200 status with the item details
async function getOutOfStockItemById(req, res) {
    try {
        const item = await inventoryOutOfStockService.getOutOfStockItemById(req.params.productId);
        if (!item) return res.status(404).json({ error: 'No out-of-stock item found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new out-of-stock item
// @param {Object} req.body - Contains the details of the out-of-stock item to add (e.g., name, category_id, supplier_id)
// Adds a new out-of-stock item to the database and returns the created item
// Responds with a 201 status and the new item's details
async function addOutOfStockItem(req, res) {
    try {
        const newItem = await inventoryOutOfStockService.addOutOfStockItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an out-of-stock item
// @param {number} productId - ID of the out-of-stock item to update
// @param {Object} req.body - Contains the updated details of the out-of-stock item
// Updates the details of an out-of-stock item in the database and returns the updated item
// Responds with a 200 status and the updated item's details
async function updateOutOfStockItem(req, res) {
    try {
        const updatedItem = await inventoryOutOfStockService.updateOutOfStockItem(req.params.productId, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an out-of-stock item
// @param {number} productId - ID of the out-of-stock item to delete
// Deletes the specified out-of-stock item from the database and returns a confirmation message
// Responds with a 200 status and a confirmation message
async function deleteOutOfStockItem(req, res) {
    try {
        const result = await inventoryOutOfStockService.deleteOutOfStockItem(req.params.productId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Export all functions for use in route handlers
module.exports = {
    getAllOutOfStockItems,
    getOutOfStockItemById,
    addOutOfStockItem,
    updateOutOfStockItem,
    deleteOutOfStockItem
};
