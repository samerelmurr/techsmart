// Import necessary modules
const express = require('express'); // Import Express framework
const inventoryRoutes = require('./Routes/inventoryRoutes'); // Import inventory routes
const inventoryOutOfStockRoutes = require('./Routes/inventoryOutOfStockRoutes'); // Import inventory out-of-stock routes
const supplierRoutes = require('./Routes/suppliersRoutes'); // Import supplier routes
const inventoryLogRoutes = require('./Routes/inventoryLogRoutes'); // Import inventory log routes
const categoriesRoutes = require('./Routes/categoriesRoutes'); // Import categories routes
const employeeRoutes = require('./Routes/employeeRoutes'); // Import employee routes

// Initialize the Express app and set the port
const app = express();
const PORT = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Middleware to parse JSON data in request bodies
app.use(express.json());

// ROUTES
app.get("/", (res) => {
    res.sendFile("index.html", {root: "public"});
})

// Define route handlers for each resource
app.use('/inventory', inventoryRoutes); // Routes for inventory management
app.use('/inventory-out-of-stock', inventoryOutOfStockRoutes); // Routes for out-of-stock items
app.use('/suppliers', supplierRoutes); // Routes for supplier management
app.use('/inventory-logs', inventoryLogRoutes); // Routes for inventory logs (tracking changes)
app.use('/categories', categoriesRoutes); // Routes for category management
app.use('/employees', employeeRoutes); // Routes for employee management

// Start the server and listen on specified port
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`); // Log the server URL
});
