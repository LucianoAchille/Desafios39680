import express from "express";
import ProductRouter from "./routes/product.router.js";
import CartRouter from "./routes/cart.router.js";

const app = express();
const PORT = 8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api/products",ProductRouter)
app.use('/api/carts', CartRouter)

//const readProducts = products.readProducts();
//console.log(await readProducts)



const server = app.listen(PORT,()=>{
    console.log(`Express en puerto ${server.address().port}`)
})
server.on("error", (error)=> console.log(`Error del servidor ${error}`))
