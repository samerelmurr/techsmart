// Import the database connection
const db = require('../db');

/**
 * Retrieve all inventory items that are in stock.
 * @returns {Promise<Array>} - Array of inventory item records in stock.
 */
async function getAllInventoryItems() {
    try {
        const [rows] = await db.query('SELECT * FROM InventoryInStock');
        return rows;
    } catch (error) {
        throw new Error('Error fetching all inventory items');
    }
}

/**
 * Retrieve a single inventory item by its product ID.
 * @param {number} productId - The ID of the product.
 * @returns {Promise<Object>} - The inventory item record matching the product ID.
 */
async function getInventoryItemById(productId) {
    try {
        const [rows] = await db.query('SELECT * FROM InventoryInStock WHERE product_id = ?', [productId]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching inventory item by ID');
    }
}

/**
 * Add a new inventory item to the database.
 * @param {Object} item - Object containing the details of the new inventory item.
 * @param {string} item.name - Name of the inventory item.
 * @param {number} item.category_id - ID of the category the item belongs to.
 * @param {number} item.quantity - Quantity of the item in stock.
 * @param {number} item.price - Price of the inventory item.
 * @param {number} item.supplier_id - ID of the supplier of the item.
 * @returns {Promise<Object>} - The newly added inventory item, including the generated ID.
 */
async function addInventoryItem(item) {
    try {
        const { name, category_id, quantity, price, supplier_id } = item;
        const [result] = await db.query(
            'INSERT INTO InventoryInStock (name, category_id, quantity, price, supplier_id) VALUES (?, ?, ?, ?, ?)',
            [name, category_id, quantity, price, supplier_id]
        );
        return { id: result.insertId, ...item };
    } catch (error) {
        throw new Error('Error adding new inventory item');
    }
}

/**
 * Update the details of an existing inventory item.
 * @param {number} productId - The ID of the inventory item to update.
 * @param {Object} updatedItem - Object containing the updated details of the inventory item.
 * @param {string} updatedItem.name - Updated name of the inventory item.
 * @param {number} updatedItem.category_id - Updated category ID of the item.
 * @param {number} updatedItem.quantity - Updated quantity of the item in stock.
 * @param {number} updatedItem.price - Updated price of the inventory item.
 * @param {number} updatedItem.supplier_id - Updated supplier ID of the item.
 * @returns {Promise<Object>} - The updated inventory item, including its ID.
 */
async function updateInventoryItem(productId, updatedItem) {
    try {
        const { name, category_id, quantity, price, supplier_id } = updatedItem;
        await db.query(
            'UPDATE InventoryInStock SET name = ?, category_id = ?, quantity = ?, price = ?, supplier_id = ? WHERE product_id = ?',
            [name, category_id, quantity, price, supplier_id, productId]
        );
        return { productId, ...updatedItem };
    } catch (error) {
        throw new Error('Error updating inventory item');
    }
}

/**
 * Delete an inventory item from the database by its product ID.
 * @param {number} productId - The ID of the inventory item to delete.
 * @returns {Promise<Object>} - A message confirming the item was deleted and the product ID.
 */
async function deleteInventoryItem(productId) {
    try {
        await db.query('DELETE FROM InventoryInStock WHERE product_id = ?', [productId]);
        return { message: 'Item deleted successfully', productId };
    } catch (error) {
        throw new Error('Error deleting inventory item');
    }
}

// Export the functions for external use
module.exports = {
    getAllInventoryItems,
    getInventoryItemById,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
};
