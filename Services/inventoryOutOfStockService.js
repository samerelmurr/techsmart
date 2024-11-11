// Import the database connection
const db = require('../db');

/**
 * Retrieve all out-of-stock inventory items.
 * @returns {Promise<Array>} - Array of out-of-stock item records.
 */
async function getAllOutOfStockItems() {
    try {
        const [rows] = await db.query('SELECT * FROM InventoryOutOfStock');
        return rows;
    } catch (error) {
        throw new Error('Error fetching all out-of-stock items');
    }
}

/**
 * Retrieve a single out-of-stock inventory item by its product ID.
 * @param {number} productId - The ID of the product to fetch.
 * @returns {Promise<Object>} - The out-of-stock item record matching the product ID.
 */
async function getOutOfStockItemById(productId) {
    try {
        const item = await db.query('SELECT * FROM InventoryOutOfStock WHERE product_id = ?', [productId]);
        return item;
    } catch (error) {
        throw new Error('Error fetching out-of-stock item by ID');
    }
}

/**
 * Add a new out-of-stock inventory item.
 * @param {Object} item - The details of the new out-of-stock item.
 * @param {string} item.name - Name of the out-of-stock item.
 * @param {number} item.category_id - ID of the category the item belongs to.
 * @param {number} item.supplier_id - ID of the supplier for the item.
 * @returns {Promise<Object>} - The newly added out-of-stock item, including the generated ID.
 */
async function addOutOfStockItem(item) {
    try {
        const { name, category_id, supplier_id } = item;
        const [result] = await db.query(
            'INSERT INTO InventoryOutOfStock (name, category_id, supplier_id) VALUES (?, ?, ?)',
            [name, category_id, supplier_id]
        );
        return { id: result.insertId, ...item };
    } catch (error) {
        throw new Error('Error adding new out-of-stock item');
    }
}

/**
 * Update the details of an existing out-of-stock item.
 * @param {number} productId - The ID of the out-of-stock item to update.
 * @param {Object} updatedItem - The updated details for the out-of-stock item.
 * @param {string} updatedItem.name - Updated name of the out-of-stock item.
 * @param {number} updatedItem.category_id - Updated category ID for the item.
 * @param {number} updatedItem.supplier_id - Updated supplier ID for the item.
 * @returns {Promise<Object>} - The updated out-of-stock item, including its ID.
 */
async function updateOutOfStockItem(productId, updatedItem) {
    try {
        const { name, category_id, supplier_id } = updatedItem;
        await db.query(
            'UPDATE InventoryOutOfStock SET name = ?, category_id = ?, supplier_id = ? WHERE product_id = ?',
            [name, category_id, supplier_id, productId]
        );
        return { productId, ...updatedItem };
    } catch (error) {
        throw new Error('Error updating out-of-stock item');
    }
}

/**
 * Delete an out-of-stock inventory item by its product ID.
 * @param {number} productId - The ID of the out-of-stock item to delete.
 * @returns {Promise<Object>} - A message confirming the item was deleted and its product ID.
 */
async function deleteOutOfStockItem(productId) {
    try {
        await db.query('DELETE FROM InventoryOutOfStock WHERE product_id = ?', [productId]);
        return { message: 'Out-of-stock item deleted successfully', productId };
    } catch (error) {
        throw new Error('Error deleting out-of-stock item');
    }
}

// Export the functions for external use
module.exports = {
    getAllOutOfStockItems,
    getOutOfStockItemById,
    addOutOfStockItem,
    updateOutOfStockItem,
    deleteOutOfStockItem
};
