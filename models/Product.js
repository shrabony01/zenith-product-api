import mongoose from "mongoose";

//the blueprint(schema)and validation rule
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0.01, "Product price must be greater than 0"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
    trim: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Product", productSchema);

export default Product;
