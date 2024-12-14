import multer from "multer";
import { __dirname } from "path";

const storageProducts = multer.diskStorage({
    filename:(req,file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)

    },
    destination: (req,file, cb) =>{
        cb(null, `${__dirname}/public/img/products`)
    }
})
export const uploadProds = multer({storage: storageProducts})