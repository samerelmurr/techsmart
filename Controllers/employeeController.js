const employeeService = require('../Services/employeeService'); // Import employee service functions

// Login function
// Authenticates an employee based on provided username and password
// @param {Object} req.body - Contains `username` and `password` for login
// Verifies employee credentials and, if valid, responds with a success message and employee details
// If invalid credentials, responds with a 401 status and an error message
// If an error occurs, responds with a 500 status and an error message
async function loginEmployee(req, res) {
    const { username, password } = req.body;

    try {
        const employee = await employeeService.verifyEmployeeCredentials(username, password);

        if (!employee) {
            return res.status(401).json({ error: 'Invalid username or password' });  // Authentication failed
        }

        res.json({
            message: 'Login successful',
            employee: { employee_id: employee.employee_id, username: employee.username }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during login' });
    }
}

// Register function
// Registers a new employee with a unique username and password
// @param {Object} req.body - Contains `username` and `password` for registration
// If registration is successful, responds with a 201 status, success message, and employee details
// If the username already exists, responds with a 400 status and an error message
// If an error occurs, responds with a 500 status and an error message
async function registerEmployee(req, res) {
    const { username, password } = req.body;

    try {
        const newEmployee = await employeeService.registerEmployee(username, password);

        if (!newEmployee) {
            return res.status(400).json({ error: 'Username already exists' });  // Username already exists
        }

        res.status(201).json({
            message: 'Employee registered successfully',
            employee: newEmployee
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during registration' });
    }
}

// Export functions for use in route handlers
module.exports = {
    loginEmployee,
    registerEmployee
};
