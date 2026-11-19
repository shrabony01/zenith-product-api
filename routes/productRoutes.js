import exprss from "express";
import Product from "../models/Product.js"

const router = exprss.Router();
//POST:Add a new product to inventory
router.post("/",async(req,res)=>{
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);

    }catch(error){
        res.status(400).json({message: error.message });
    }
});
//READ ONE: GET a single product by id
router.get("/:id",async(req,res){
    try{
        const product = await Product.findById(req.params.id);

        //if nothing matches return 404 
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        //respond with 200 OK and matching product
        res.status(200).json(product);
    }catch(error){
        res.status(400).json({message: "Invalid product ID format", error:error.message});
    }
});
export default router;