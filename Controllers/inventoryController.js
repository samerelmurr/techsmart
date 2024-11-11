const inventoryService = require('../Services/inventoryService'); // Import inventory service functions

// Get all inventory items
// Retrieves all inventory items from the database and returns them in the response
// Responds with a 200 status and the list of items, or a 500 status in case of server error
async function getAllInventoryItems(req, res) {
    try {
        const items = await inventoryService.getAllInventoryItems();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get inventory item by ID
// @param {number} productId - ID of the inventory item to retrieve
// Retrieves a specific inventory item by its ID and returns it in the response
// If the item is not found, responds with a 404 status and an error message
// Otherwise, responds with a 200 status and the item details
async function getInventoryItemById(req, res) {
    try {
        const item = await inventoryService.getInventoryItemById(req.params.productId);
        if (!item) return res.status(404).json({ error: 'No item found with this ID' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add a new inventory item
// @param {Object} req.body - Contains the details of the inventory item to add (e.g., name, category_id, quantity, price, supplier_id)
// Adds a new inventory item entry to the database and returns the created item
// Responds with a 201 status and the new item's details, or a 500 status in case of server error
async function addInventoryItem(req, res) {
    try {
        const newItem = await inventoryService.addInventoryItem(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update an existing inventory item
// @param {number} productId - ID of the inventory item to update
// @param {Object} req.body - Contains the updated details of the inventory item (e.g., name, category_id, quantity, price, supplier_id)
// Updates an inventory item in the database and returns the updated item
// Responds with a 200 status and the updated item's details, or a 500 status in case of server error
async function updateInventoryItem(req, res) {
    try {
        const updatedItem = await inventoryService.updateInventoryItem(req.params.productId, req.body);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete an inventory item
// @param {number} productId - ID of the inventory item to delete
// Deletes an inventory item from the database and returns a success message
// Responds with a 200 status and the result message, or a 500 status in case of server error
async function deleteInventoryItem(req, res) {
    try {
        const result = await inventoryService.deleteInventoryItem(req.params.productId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Export all functions for use in route handlers
module.exports = {
    getAllInventoryItems,
    getInventoryItemById,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
};
