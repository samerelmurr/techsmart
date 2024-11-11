const express = require('express');
const supplierControllers = require('../Controllers/suppliersController');
const router = express.Router();

// Get all suppliers
router.get('/', supplierControllers.getAllSuppliers);

// Get supplier by ID
router.get('/id/:supplierId', supplierControllers.getSupplierById);

// Get supplier by name
router.get('/name/:supplierName', supplierControllers.getSupplierByName);

// Get supplier by contact info
router.get('/contact/:supplierContactInfo', supplierControllers.getSupplierByContactInfo);

// Add a new supplier
router.post('/', supplierControllers.addSupplier);

// Update a supplier
router.put('/:supplierId', supplierControllers.updateSupplier);

// Delete a supplier
router.delete('/:supplierId', supplierControllers.deleteSupplier);

module.exports = router;
