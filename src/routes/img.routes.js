import { Router } from "express";
import { uploadProds } from "../config/multer";

const multerRouter = Router()
multerRouter.post('/products', uploadProds.single('product'), (req,res) => {
console.log(req)
res.status(200).send("Se cargo la imagen con exito")
})

export default multerRouter