# Zenith Product Inventory API (MongoDB-sba)

A RESTful backend API built with Node.js, Express, Mongoose, and MongoDB Atlas for Zenith's e-commerce store. It handles creating, reading, updating, and deleting products in the inventory, along with dynamic filtering, price sorting, and pagination for browsing the catalog.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **ODM:** Mongoose
- **Environment Management:** `dotenv`
- **API Testing:** Postman

## What I Learned
Schema Validation: Defining a Mongoose schema ensures every product saved to MongoDB has required details (name, description, price, category), enforces a price greater than 0, and sets sensible defaults like inStock: true.

Modular Structure: Keeping the database connection (config/), data model (models/), and route handlers (routes/) in separate folders makes the code much easier to read, test, and debug.

Dynamic Querying: Combining optional query parameters (req.query) with Mongoose's .find(), .sort(), .skip(), and .limit() methods allows a single GET endpoint to power filtering, price sorting, and pagination at the same time.