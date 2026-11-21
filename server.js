import "dotenv/config";
import express from "express";
import connectDB from "./config/connection.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Establish connection to MongoDB Atlas
connectDB();

// Middleware to parse incoming JSON payloads into req.body
app.use(express.json());

app.get("/",(req,res)=>{
    res.json({message: "Welcome to the Zenith Product Inventory API"});

});

app.use("/api/products",productRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
})