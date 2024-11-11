const categoriesService = require('../Services/catagoriesService'); // Import category service functions

// Get all categories
// Fetches and returns a list of all categories from the database
// Responds with a JSON array of categories
// If an error occurs, responds with a 500 status and an error message
async function getAllCategories(req, res) {
    try {
        const categories = await categoriesService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while retrieving categories.' });
    }
}

// Get category by ID
// Fetches a single category by its ID
// @param {string} req.params.categoryId - The ID of the category to retrieve
// If found, responds with the category as JSON
// If not found, responds with a 404 status and an error message
// If an error occurs, responds with a 500 status and an error message
async function getCategoryById(req, res) {
    try {
        const category = await categoriesService.getCategoryById(req.params.categoryId);
        if (!category) return res.status(404).json({ error: 'Category not found by this ID' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while retrieving category by ID.' });
    }
}

// Get category by name
// Fetches a single category by its name
// @param {string} req.params.categoryName - The name of the category to retrieve
// If found, responds with the category as JSON
// If not found, responds with a 404 status and an error message
// If an error occurs, responds with a 500 status and an error message
async function getCategoryByName(req, res) {
    try {
        const category = await categoriesService.getCategoryByName(req.params.categoryName);
        if (!category) return res.status(404).json({ error: 'Category not found by this name' });
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while retrieving category by name.' });
    }
}

// Add a category
// Adds a new category to the database
// @param {Object} req.body - Contains `category_name` for the new category
// Responds with the newly created category as JSON and a 201 status
// If an error occurs, responds with a 500 status and an error message
async function addCategory(req, res) {
    try {
        const newCategory = await categoriesService.addCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while adding category.' });
    }
}

// Update a category
// Updates an existing category's information
// @param {string} req.params.categoryId - The ID of the category to update
// @param {Object} req.body - Contains `category_name` for the update
// Responds with the updated category as JSON
// If an error occurs, responds with a 500 status and an error message
async function updateCategory(req, res) {
    try {
        const updatedCategory = await categoriesService.updateCategory(req.params.categoryId, req.body);
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while updating category.' });
    }
}

// Delete a category
// Deletes a category by its ID
// @param {string} req.params.categoryId - The ID of the category to delete
// Responds with a success message and status 200
// If an error occurs, responds with a 500 status and an error message
async function deleteCategory(req, res) {
    try {
        const result = await categoriesService.deleteCategory(req.params.categoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error occurred while deleting category.' });
    }
}

// Export functions for use in route handlers
module.exports = {
    getAllCategories,
    getCategoryById,
    getCategoryByName,
    addCategory,
    updateCategory,
    deleteCategory,
};
