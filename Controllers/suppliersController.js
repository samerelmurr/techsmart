const supplierServices = require('../Services/suppliersServices'); // Import supplier service functions

// Get all suppliers
// Retrieves all suppliers from the database and returns them in the response
// Responds with a 404 status if no suppliers are found, otherwise returns a 200 status with the list of suppliers
async function getAllSuppliers(req, res) {
    try {
        const [suppliers] = await supplierServices.getAllSuppliers();
        if (!suppliers.length) return res.status(404).json({ error: 'No suppliers found' });
        res.status(200).json(suppliers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get supplier by ID
// @param {number} supplierId - ID of the supplier to retrieve
// Retrieves a supplier by their ID and returns it in the response
// Responds with a 404 status if the supplier is not found, otherwise returns a 200 status with the supplier details
async function getSupplierById(req, res) {
    try {
        const supplier = await supplierServices.getSupplierById(req.params.supplierId);
        if (!supplier) return res.status(404).json({ error: 'No supplier found with this ID' });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get supplier by name
// @param {string} supplierName - Name of the supplier to retrieve
// Retrieves a supplier by their name and returns it in the response
// Responds with a 404 status if the supplier is not found, otherwise returns a 200 status with the supplier details
async function getSupplierByName(req, res) {
    try {
        const [supplier] = await supplierServices.getSupplierByName(req.params.supplierName);
        if (!supplier) return res.status(404).json({ error: 'No supplier found with this name' });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Get supplier by contact info
// @param {string} supplierContactInfo - Contact information of the supplier to retrieve
// Retrieves a supplier by their contact information and returns it in the response
// Responds with a 404 status if the supplier is not found, otherwise returns a 200 status with the supplier details
async function getSupplierByContactInfo(req, res) {
    try {
        const supplier = await supplierServices.getSupplierByContactInfo(req.params.supplierContactInfo);
        if (!supplier) return res.status(404).json({ error: 'No supplier found with this contact information' });
        res.status(200).json(supplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Add new supplier
// @param {Object} req.body - Contains the supplier details (e.g., name, contact info)
// Adds a new supplier to the database and returns the created supplier
// Responds with a 201 status with the new supplier's details
async function addSupplier(req, res) {
    try {
        const newSupplier = await supplierServices.addSupplier(req.body);
        res.status(201).json(newSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Update a supplier
// @param {Object} req.body - Contains the supplier details to update (e.g., name, contact info)
// Updates the supplier's details in the database and returns the updated supplier information
// Responds with a 200 status with the updated supplier's details
async function updateSupplier(req, res) {
    try {
        const updatedSupplier = await supplierServices.updateSupplier(req.body);
        res.status(200).json(updatedSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Delete a supplier
// @param {number} supplierId - ID of the supplier to delete
// Deletes a supplier from the database and returns a confirmation message
// Responds with a 200 status with the deletion confirmation and the deleted supplier ID
async function deleteSupplier(req, res) {
    try {
        const deletedSupplier = await supplierServices.deleteSupplier(req.params.supplierId);
        res.status(200).json(deletedSupplier);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// Export all functions for use in route handlers
module.exports = {
    getAllSuppliers,
    getSupplierById,
    getSupplierByContactInfo,
    getSupplierByName,
    addSupplier,
    updateSupplier,
    deleteSupplier
};
