import { Console } from 'console';
import {copyFile, promises as fs} from 'fs';
import { nanoid } from 'nanoid';

export default class ProductManager {
    constructor(){
        this.path="./src/models/products.json";
        this.products = []
    }

    writeProduct = async (product)=>{
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        return JSON.parse(products)
    }

    addProduct = async (product)=>{
        let productsOld = await this.readProducts();
        product.id = nanoid();
        let productsAll = [...productsOld,product];
        await this.writeProduct(productsAll);
        return `Producto ${product.title} agregado correctamente`
     }
 
    getProducts = async ()=>{
        let products = await this.readProducts();
        return products;
    }
    
    exist = async(id) =>{
        let products = await this.readProducts();
        //console.log(`console exist ${id}`)
        //console.log(products)
        return products.find(el=>el.id === id)
    }
    getProductById = async(id)=>{
        let product = await this.exist(id);
        if(!product) {
            console.log(`Producto ${id} no existe`)
            return "Producto no existe"    
        }
        else {  //console.log(product);
                return product}
    }

    updateProduct = async (id, product)=> {
        //console.log(id)
        //console.log(product)
        let productToUpdate = await this.exist(id);
        if(!productToUpdate) {
            console.log(`Producto ${id} no existe`)
            return "Producto no existe"    
        }
        await this.deleteProductByID(id);
        let productsAll = await this.readProducts();
        
        let productsNew = [
            {...product, id:id},
            ...productsAll
        ];
        await this.writeProduct(productsNew);
        return `Producto ${product.title} modificado exitosamente`
    }

    deleteProductByID = async (id)=>{
        let products = await this.readProducts();
        let deleteProduct = products.some(el=>el.id === id);
        if(deleteProduct) {
            let newProducts = products.filter(el=>el.id != id);
            await fs.writeFile(this.path,JSON.stringify(newProducts));
            console.log(`Producto ${id} eliminado`);
            return "Producto eliminado"
        } else{
            console.log(`Producto ${id} no existe para eliminar`);
            return "Producto no existe para eliminar"
        }
                
    }
}

//const products = new ProductManager;
// products.addProduct('titulo1','description1',1111,'image1',11,1000);
// products.addProduct('titulo2','description2',2222,'image2',22,2000);
// products.addProduct('titulo3','description3',3333,'image3',33,3000);
//products.getProducts();
//products.getProductById(3); //no existe
//products.getProductById(2);
//products.deleteProductByID(2);
