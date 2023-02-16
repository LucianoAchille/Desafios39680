import { Router } from "express";
import CartManager from "../controllers/CartManager";

const CartRouter = Router();

const cart = new CartManager();

CartRouter.post('/',async (req,res)=>{
    res.send(await cart.addCart());
})

CartRouter.get('/',async (req,res)=>{
    res.send(await cart.readCarts())
})

CartRouter.get('/:id',async (req,res)=>{
    res.send(await cart.getCartById(req.params.id))
    
})











export default CartRouter;