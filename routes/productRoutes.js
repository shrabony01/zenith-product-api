import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// 1. CREATE: POST /api/products -> Add a new product to inventory
router.post("/", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 5. READ ALL (WITH ADVANCED QUERYING): GET /api/products

router.get("/", async (req, res) => {
  try {
    // Destructure optional query parameters from the request URL
    const { category, minPrice, maxPrice, sortBy, page, limit } = req.query;

    // Dynamically build the MongoDB filter object
    const filter = {};

    // Filter by category if provided 
    if (category) {
      filter.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    // Filter by minimum and/or maximum price if either is provided
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice); // Greater than or equal to minPrice
      }
      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice); // Less than or equal to maxPrice
      }
    }

    //  Dynamically build the sort object
    let sortOptions = {};
    if (sortBy === "price_asc") {
      sortOptions.price = 1; // Lowest price to highest price
    } else if (sortBy === "price_desc") {
      sortOptions.price = -1; // Highest price to lowest price
    } else {
      sortOptions.createdAt = -1; // Default sort: newest products first
    }

    //  Calculate pagination values (defaulting to page 1, limit 10)
    const pageNumber = Math.max(1, parseInt(page, 10) || 1);
    const limitNumber = Math.max(1, parseInt(limit, 10) || 10);
    const skipCount = (pageNumber - 1) * limitNumber;

    //  Execute the chained Mongoose query 
    const products = await Product.find(filter)
      .sort(sortOptions)
      .skip(skipCount)
      .limit(limitNumber);

    // Return the resulting array of products with 200 OK
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. READ ONE: GET /api/products/:id -> Retrieve a single product by its _id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product ID format", error: error.message });
  }
});

// 3. UPDATE: PUT /api/products/:id -> Update an existing product by its _id
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 4. DELETE: DELETE /api/products/:id -> Remove a product by its _id
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid product ID format", error: error.message });
  }
});

export default router;
