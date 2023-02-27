import {copyFile, promises as fs} from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const product = new ProductManager;
export default class CartManager{
    constructor(){
        this.path="./src/models/cart.json";
        //this.cart = []
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
        let cartConcat = [...cartOld, {id:id, products: []} ]
        await this.writeCarts(cartConcat);
        return "Carrito Agregado"
    }

    getCartById = async(id)=>{
        let cart = await this.exist(id);
        if(!cart) return `Carrito ${id} no existe`;
        //console.log(product);
        return cart;
    }

    addProductInCart = async(cid,pid)=>{
        let cartById = await this.exist(cid);
        if(!cartById) return `Carrito ${cid} no existe`;
        let productById = product.exist(pid);
        if(!productById) return `Producto ${pid} no existe`;

        let cartsAll = await this.readCarts();
        let cartFilter = cartsAll.filter(el=>el.id != cid);

        if(cartById.products.some(el=>el.id === pid)){
            let moreProductInCart= cartById.products.find(el=>el.id === pid);
            moreProductInCart.quantity++;
            let cartConcat =[cartById, ...cartFilter];
            await this.writeCarts(cartConcat);
            return `Se aumento en 1 el producto ${pid} en el carrito ${cid}`;
        }
        
        cartById.products.push({id:pid, quantity: 1});
        let cartConcat = [cartById, ...cartFilter];
        await this.writeCarts(cartConcat);
        return `Producto ${pid} agregado al carrito ${cid}`;
    }
}
