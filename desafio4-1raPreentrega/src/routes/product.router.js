import { Router } from "express";

const ProductRouter = Router();

import ProductManager from "../controllers/ProductManager.js";
const product = new ProductManager();

ProductRouter.post("/", async (req,res)=>{
    let newProduct = req.body;
    res.send (await product.addProduct(newProduct));

})

ProductRouter.get("/",async (req,res)=>{
    res.send(await product.getProducts());
    
})

ProductRouter.get("/:id",async (req,res)=>{
    res.send(await product.getProductById(req.params.id));
})

ProductRouter.delete("/:id",async (req,res)=>{
    res.send(await product.deleteProductByID(req.params.id));

})

ProductRouter.put("/:id",async (req,res)=>{
    //let updateProduct = req.body;
    res.send(await product.updateProduct(req.params.id,req.body));
})

export default ProductRouter;