const express = require('express');
const router = express.Router();
const categoriesController = require('../Controllers/catagoriesController');

// Get all categories
router.get('/', categoriesController.getAllCategories);

// Get a category by ID
router.get('/:categoryId', categoriesController.getCategoryById);

// Get a category by name
router.get('/name/:categoryName', categoriesController.getCategoryByName);

// Add a new category
router.post('/', categoriesController.addCategory);

// Update a category by ID
router.put('/:categoryId', categoriesController.updateCategory);

// Delete a category by ID
router.delete('/:categoryId', categoriesController.deleteCategory);

module.exports = router;
