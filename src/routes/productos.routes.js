import {Router} from 'express'
import crypto from 'crypto'
import {__dirname} from '../path.js'
import { promises as fs} from 'fs';
import path from 'path';

const productRouter = Router()
const productosPath = path.resolve(__dirname, '../src/db/productos.json');

const productosData = await fs.readFile(productosPath, 'utf-8');
const productos = JSON.parse(productosData);

productRouter.get('/', (req,res) => {
    const {limit} = req.query
    const products = products.slice(0, limit)
    res.status(200).send(productos)
})


productRouter.get('/:pid', (req,res) => { 
    const idProducto = parseInt(req.params.pid);
    const producto = productos.find(producto => producto.id == parseInt(idProducto))

    if(producto){
        res.status(200).send(producto)
    }else {
        res.status(404).send({aviso: "No existe el producto"})
    }
})

productRouter.post('/', async (req,res) => {
    const {title, description, code, price, category, stock, thumbnails} = req.body
    const productonuevo = {
        id: crypto.randomBytes(10).toString('hex'),
        title: title, 
        description: description,
        code: code,
        category: category,
        price: price,
        stock: stock,
        status: true,
        thumbnails: []
    }
    productos.push(productonuevo)
    await fs.writeFile(productosPath, JSON.stringify(productos))
    res.status(201).send({aviso: `Su producto nuevo fue generado con exito y obtuvo la id: ${productonuevo.id}`})
})


productRouter.put('/api/productos/:pid', async (req,res) =>{
    const idProducto = parseInt(req.params.pid)
    const {title, description, code, price, category, stock, thumbnails, status} = req.body
    const indice = productos.findIndex((prod) => prod.id == idProducto)
    if(indice != -1) {
         productos[indice].title = title
         productos[indice].description = description
         productos[indice].code = code
         productos[indice].price = price
         productos[indice].status = status
         productos[indice].category = category
         productos[indice].stock = stock
         productos[indice].thumbnails = thumbnails
         await fs.writeFile(productosPath, JSON.stringify(productos))

         res.status(200).send({aviso: `Se actualizo correctamente el producto`})


    } else{
        res.status(404).send({aviso: `Error en actualizar el producto`})
         }
})

productRouter.delete('/:pid', async (req,res) => {
    const idProducto = req.params.pid
    const indice = productos.findIndex(prod => prod.id == idProducto)
    

    if(indice != -1) {
        productos.splice(indice, 1)
        await fs.writeFile(productosPath, JSON.stringify(productos))
        res.status(200).send({aviso: 'Producto eliminado correctamente'})

    } else {
        res.status(404).send({aviso: "El producto no existe"})
    }

})

export default productRouter