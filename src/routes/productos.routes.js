

import {Router} from 'express'
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct} from '../controllers/products.controllers.js';


const productRouter = Router()

productRouter.get('/', getProducts) // consulto el total de productos


productRouter.get('/:pid', getProduct)


productRouter.post('/', createProduct) // creo un producto nuevo


productRouter.put('/:pid', updateProduct ) 

productRouter.delete('/:pid', deleteProduct )



export default productRouter