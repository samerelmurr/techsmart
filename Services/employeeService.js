const db = require('../db');

// Function to verify employee credentials (login)
async function verifyEmployeeCredentials(username, password) {
    const [rows] = await db.query('SELECT * FROM Employees WHERE username = ?', [username]);
    if (rows.length === 0) {
        return null;  // Username not found
    }

    const employee = rows[0];
    if (employee.password === password) {
        return employee;  // Password matches
    } else {
        return null;  // Invalid password
    }
}

// Function to register a new employee
async function registerEmployee(username, password) {
    // Check if username already exists
    const [existingEmployee] = await db.query('SELECT * FROM Employees WHERE username = ?', [username]);
    if (existingEmployee.length > 0) {
        return null;  // Username already exists
    }

    // Insert new employee into the database
    const [result] = await db.query('INSERT INTO Employees (username, password) VALUES (?, ?)', [username, password]);

    return { employee_id: result.insertId, username, password };
}

module.exports = {
    verifyEmployeeCredentials,
    registerEmployee
};
