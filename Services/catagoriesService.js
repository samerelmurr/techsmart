const db = require('../db'); // Import the database connection

// Get all categories from the Categories table
// Returns an array of all category records in the database
async function getAllCategories() {
    try {
        const [rows] = await db.query('SELECT * FROM Categories');
        return rows;
    } catch (error) {
        throw new Error('Error fetching all categories');
    }
}

// Get a single category by ID
// @param {number} categoryId - The ID of the category to retrieve
// Returns the category record that matches the provided ID
async function getCategoryById(categoryId) {
    try {
        const [rows] = await db.query('SELECT * FROM Categories WHERE category_id = ?', [categoryId]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching category by ID');
    }
}

// Get a single category by name
// @param {string} categoryName - The name of the category to retrieve
// Returns the category record that matches the provided name
async function getCategoryByName(categoryName) {
    try {
        const [rows] = await db.query('SELECT * FROM Categories WHERE category_name = ?', [categoryName]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching category by name');
    }
}

// Add a new category to the Categories table
// @param {Object} categoryBody - An object containing the category details
// Returns the new category with its generated ID
async function addCategory(categoryBody) {
    try {
        const { category_name } = categoryBody;
        const [result] = await db.query('INSERT INTO Categories (category_name) VALUES (?)', [category_name]);
        return { id: result.insertId, category_name };
    } catch (error) {
        throw new Error('Error adding category');
    }
}

// Update an existing category by ID
// @param {number} categoryId - The ID of the category to update
// @param {Object} categoryBody - An object containing the updated category details
// Returns the updated category information
async function updateCategory(categoryId, categoryBody) {
    try {
        const { category_name } = categoryBody;
        await db.query('UPDATE Categories SET category_name = ? WHERE category_id = ?', [category_name, categoryId]);
        return { id: categoryId, category_name };
    } catch (error) {
        throw new Error('Error updating category');
    }
}

// Delete a category by ID
// @param {number} categoryId - The ID of the category to delete
// Returns a message confirming successful deletion and the deleted category ID
async function deleteCategory(categoryId) {
    try {
        await db.query('DELETE FROM Categories WHERE category_id = ?', [categoryId]);
        return { message: 'Category deleted successfully', categoryId };
    } catch (error) {
        throw new Error('Error deleting category');
    }
}

// Export all functions for use in other parts of the application
module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory,
};
