import { Router } from "express";
import  crypto from 'crypto';
import path from "path";
import {__dirname} from '../path.js'
import { promises as fs} from 'fs';


const cartRouter = Router()

const carritosPath = path.resolve(__dirname, '../src/db/carritos.json')

const carritosData = await fs.readFile(carritosPath, 'utf-8');
const carritos = JSON.parse(carritosData);


cartRouter.get('/:id', (req,res) => {
    const idCarrito = parseInt(req.params.cid);
    const carrito = carritos.find(carrito => cart.id == parseInt(idCarrito))

    if(carrito){
        res.status(200).send(carrito.products)
    }else {
        res.status(404).send({aviso: "No se encontro un carrito con este ID"})
    }

})

cartRouter.post('/', async (req,res) => {
const newCart = {
    id: crypto.randomBytes(5).toString('hex'),
    products: []
    }
    carritos.push(newCart)
    await fs.writeFile(carritosPath, JSON.stringify(carritos))

    res.status(200).send(`Carrito creado con exito ${newCart.id}`)
    
})
cartRouter.post('/:cid/products/:pid', async (req,res) => {
    const idCarrito = parseInt(req.params.cid);
    const idProducto = req.params.pid
    const {quantity} = req.body

    const carrito = carritos.find(carrito => cart.id == parseInt(idCarrito))

    if(carrito){
        const indice = carrito.products.findIndex(prod => prod.id == idProducto )
        
        if(indice != -1){
            carrito.products[indice].quantity = quantity
        } else{
            carrito.products.push({id: idProducto, quantity: quantity})
        }
        await fs.writeFile(carritosPath, JSON.stringify(carritos))
        res.status(200).send("Se guardo el producto")
    }else {
        res.status(404).send({aviso: "No se encontro un carrito con este ID"})
    }

    
})

export default cartRouter