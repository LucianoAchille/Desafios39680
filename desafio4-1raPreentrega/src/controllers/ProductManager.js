import {copyFile, promises as fs} from 'fs';
import { nanoid } from 'nanoid';


export default class ProductManager {
    constructor(){
        this.path="../src/models/products.json";
        this.products = []
    }

    static id=0;

    writeProduct = async (product)=>{
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    addProduct = async (product)=>{
        //title,description,price,image,code,stock,status,category
        // ProductManager.id++;
        // let newProduct ={
        //     title,
        //     description,
        //     price,
        //     image,
        //     code,
        //     stock,
        //     id: ProductManager.id,
        //     status,
        //     category
        // }
        let productsOld = await this.readProducts();
        product.id= nanoid();
        let productsAll = [...productsOld,product];
        //await fs.writeFile(this.path, JSON.stringify(productsAll));
        await this.writeProduct(productsAll);
        return "Producto Agregado"

        // this.products.push(newProduct);
        // await fs.writeFile(this.path,JSON.stringify(this.products))
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        
        return JSON.parse(products)
    }


    getProducts = async ()=>{
        let products = await this.readProducts();
        //console.log(products)
        return products;

    }
    
    exist = async(id) =>{
        let products = await this.readProducts();
        return products.find(el=>el.id === id)
    }
    getProductById = async(id)=>{
        
        let product = await this.exist(id);
        if(!product) console.log(`Producto ${id} no existe`)
        else {  //console.log(product);
                return product}
    }

    updateProduct = async ({id, ...product})=> {
        let idProd = product.id;
        await this.deleteProductByID(id);
        let productOld = await this.readProducts();
        let productsNew = [
            {id, ...product},
            ...productOld
        ]
        await this.path,JSON.stringify(this.productsNew)
    }

    deleteProductByID = async (id)=>{
        let products = await this.readProducts();
        //let newProducts = products.filter(el=>el.id != id)
        //console.log(newProducts)
        let deleteProduct = products.some(el=>el.id === id);
        if(deleteProduct) {
            let newProducts = products.filter(el=>el.id != id);
            await fs.writeFile(this.path,JSON.stringify(newProducts));
            console.log(`Producto ${id} eliminado`)
        } else{
            console.log(`Producto ${id} no existe`)
        }
                
    }
}

const products = new ProductManager;
// products.addProduct('titulo1','description1',1111,'image1',11,1000);
// products.addProduct('titulo2','description2',2222,'image2',22,2000);
// products.addProduct('titulo3','description3',3333,'image3',33,3000);
products.getProducts();
//products.getProductById(3); //no existe
//products.getProductById(2);
//products.deleteProductByID(2);
