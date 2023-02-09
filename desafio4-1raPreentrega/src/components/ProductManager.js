import {copyFile, promises as fs} from 'fs';

export default class ProductManager {
    constructor(){
        this.path="./products.json";
        this.products = []
    }

    static id=0;

    addProduct = async (title,description,price,image,code,stock)=>{
        ProductManager.id++;
        let newProduct ={
            title,
            description,
            price,
            image,
            code,
            stock,
            id: ProductManager.id
        }
        
        this.products.push(newProduct);
        await fs.writeFile(this.path,JSON.stringify(this.products))
    }
    
    readProducts = async ()=>{
        let products = await fs.readFile(this.path,'utf-8');
        
        return JSON.parse(products)
    }


    getProducts = async ()=>{
        let products = await this.readProducts();

        console.log(products)
    }

    
    getProductById = async(id)=>{
        let products = await this.readProducts();
        let product = products.find(el=>el.id === id)
        if(!product) console.log(`Producto ${id} no existe`)
        else console.log(product);
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
        let newProducts = products.filter(el=>el.id != id)
        //console.log(newProducts)
        await fs.writeFile(this.path,JSON.stringify(newProducts))
        console.log(`Producto ${id} eliminado`)
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
