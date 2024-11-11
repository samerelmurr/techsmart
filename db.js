// Import and configure dotenv to load environment variables from a .env file
require('dotenv').config();

const mysql = require('mysql2'); // Import the mysql2 library to interact with the MySQL database

// Create a connection pool to the MySQL database using environment variables for secure configuration
const db = mysql.createPool({
    host: process.env.DB_HOST,       // Database host, e.g., 'localhost' or a specific IP address
    user: process.env.DB_USER,       // Database username, specified in the .env file
    password: process.env.DB_PASSWORD, // Database password, specified in the .env file
    database: process.env.DB_NAME    // Database name to connect to, specified in the .env file
});

// Export the database connection as a Promise-based object to enable async/await syntax in queries
module.exports = db.promise();