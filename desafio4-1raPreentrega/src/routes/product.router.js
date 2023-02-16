import { Router } from "express";

const ProductRouter = Router();

import ProductManager from "../controllers/ProductManager.js";
const product = new ProductManager();

ProductRouter.post("/", async (req,res)=>{
    let newProduct = req.body;
    res.send (await product.addProduct(newProduct));

})

ProductRouter.get("/",async (req,res)=>{
    // let limit = parseInt(req.query.limit);
    // console.log(limit)
    // if (!limit) return res.send(await readProducts)
              
    res.send(await product.getProducts());
    
})

ProductRouter.get("/:id",async (req,res)=>{
    let id= parseInt(req.params.id)
    //console.log(id)
    // let allProducts= await readProducts;
    // let productById= allProducts.find(product=> product.id === id)
    // res.send(productById)
    res.send(await product.getProductById(id));
})

ProductRouter.delete("/:id",async (req,res)=>{
    let id= parseInt(req.params.id);
    res.send(await product.deleteProductByID(id));

})

ProductRouter.put("/:id",async (req,res)=>{
    let id= parseInt(req.params.id);
    let updateProduct = req.body;
    res.send(await product.updateProduct(id,updateProduct));
})

export default ProductRouter;