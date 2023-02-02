import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
app.use(express.urlencoded({extended:true}));

const products = new ProductManager();
const readProducts = products.readProducts();
//console.log(await readProducts)
app.get("/products",async (req,res)=>{
    let limit = parseInt(req.query.limit);
    console.log(limit)
    if (!limit) return res.send(await readProducts)
    else{
        let allProducts= await readProducts
        let productLimit= allProducts.slice(0,limit)
        
        res.send(productLimit)
    }
})

app.get("/products/:id",async (req,res)=>{
    let id= parseInt(req.params.id)
    //console.log(id)
    let allProducts= await readProducts;
    let productById= allProducts.find(product=> product.id === id)
    res.send(productById)
})


const PORT = 8080;
const server = app.listen(PORT,()=>{
    console.log(`Express en puerto ${server.address().port}`)
})
server.on("error", (error)=> console.log(`Error del servidor ${error}`))
