import exprss from "express";
import Product from "../models/Product.js"

const router = exprss.Router();
//POST:Add a new product to inventory
router.post("/",async(req,res)=>{
    try{
        const newProduct = await Product.create(req.body);
        res.status(201).json(newProduct);

    }catch(error){
        res.status(400).json({message:error.message});
    }
});
export default router;