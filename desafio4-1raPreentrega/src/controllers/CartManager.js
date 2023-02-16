import {copyFile, promises as fs} from 'fs';
import { nanoid } from 'nanoid';

export default class CartManager{
    constructor(){
        this.path="../src/models/cart.json";
        this.cart = []
    }

    writeCarts = async (cart)=>{
        await fs.writeFile(this.path, JSON.stringify(cart));
    }

    readCarts = async ()=>{
        let cart = await fs.readFile(this.path,'utf-8');
        
        return JSON.parse(cart)
    }

    exist = async(id) =>{
        let carts = await this.readCarts();
        return carts.find(el=>el.id === id)
    }
    
    addCart = async (cart)=>{
        let cartOld = await this.readCarts();
        let id = nanoid();
        let cartConcat = [{id:id, cart: []}, ...cartOld]
        await this.writeCarts(cartConcat);
        return "Carrito Agregado"
    }

    getCartById = async(id)=>{
        
        let cart = await this.exist(id);
        if(!cart) console.log(`Carrito ${id} no existe`)
        else {  //console.log(product);
                return cart}
    }

}
