// Import the database connection
const db = require('../db');

/**
 * Retrieve all suppliers from the database.
 * @returns {Promise<Array>} - Array of supplier records.
 */
async function getAllSuppliers() {
    try {
        const [rows] = await db.query('SELECT * FROM Suppliers');
        return rows;
    } catch (error) {
        throw new Error('Error fetching suppliers');
    }
}

/**
 * Retrieve a specific supplier by their ID.
 * @param {number} supplierId - The ID of the supplier.
 * @returns {Promise<Object>} - Supplier record matching the ID.
 */
async function getSupplierById(supplierId) {
    try {
        const supplier = await db.query('SELECT * FROM Suppliers WHERE supplier_id = ?', [supplierId]);
        return supplier;
    } catch (error) {
        throw new Error('Error fetching supplier by ID');
    }
}

/**
 * Retrieve a supplier by their name.
 * @param {string} supplierName - The name of the supplier.
 * @returns {Promise<Object>} - Supplier record matching the name.
 */
async function getSupplierByName(supplierName) {
    try {
        const [rows] = await db.query('SELECT * FROM Suppliers WHERE supplier_name = ?', [supplierName]);
        return rows[0];
    } catch (error) {
        throw new Error('Error fetching supplier by name');
    }
}

/**
 * Retrieve a supplier by their contact information.
 * @param {string} supplierContactInfo - The contact information of the supplier.
 * @returns {Promise<Object>} - Supplier record matching the contact info.
 */
async function getSupplierByContactInfo(supplierContactInfo) {
    try {
        const supplier = await db.query('SELECT * FROM Suppliers WHERE contact_info = ?', [supplierContactInfo]);
        return supplier;
    } catch (error) {
        throw new Error('Error fetching supplier by contact info');
    }
}

/**
 * Add a new supplier to the database.
 * @param {Object} supplierBody - Object containing the supplier's details.
 * @param {string} supplierBody.supplier_name - Name of the supplier.
 * @param {string} supplierBody.contact_info - Contact information of the supplier.
 * @returns {Promise<Object>} - The newly created supplier's ID and details.
 */
async function addSupplier(supplierBody) {
    try {
        const { supplier_name, contact_info } = supplierBody;
        const [result] = await db.query(
            'INSERT INTO Suppliers (supplier_name, contact_info) VALUES (?, ?)',
            [supplier_name, contact_info]
        );
        return { id: result.insertId, supplier_name, contact_info };
    } catch (error) {
        throw new Error('Error adding new supplier');
    }
}

/**
 * Update a supplier's information in the database.
 * @param {Object} supplierBody - Object containing updated supplier details.
 * @param {number} supplierBody.supplier_id - ID of the supplier to update.
 * @param {string} supplierBody.supplier_name - Updated name of the supplier.
 * @param {string} supplierBody.contact_info - Updated contact information of the supplier.
 * @returns {Promise<Object>} - Updated supplier details.
 */
async function updateSupplier(supplierBody) {
    try {
        const { supplier_id, supplier_name, contact_info } = supplierBody;
        await db.query(
            'UPDATE Suppliers SET supplier_name = ?, contact_info = ? WHERE supplier_id = ?',
            [supplier_name, contact_info, supplier_id]
        );
        return { supplier_id, supplier_name, contact_info };
    } catch (error) {
        throw new Error('Error updating supplier');
    }
}

/**
 * Delete a supplier from the database.
 * @param {number} supplierId - ID of the supplier to delete.
 * @returns {Promise<Object>} - Confirmation message and the deleted supplier ID.
 */
async function deleteSupplier(supplierId) {
    try {
        await db.query('DELETE FROM Suppliers WHERE supplier_id = ?', [supplierId]);
        return { message: 'Supplier deleted successfully', supplierId };
    } catch (error) {
        throw new Error('Error deleting supplier');
    }
}

// Export functions for external use
module.exports = {
    getAllSuppliers,
    getSupplierById,
    getSupplierByContactInfo,
    getSupplierByName,
    addSupplier,
    updateSupplier,
    deleteSupplier
};
