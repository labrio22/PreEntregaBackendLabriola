import express from 'express'
import productRouter from './routes/productos.routes.js'
import multer from 'multer'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/img.routes.js'

const app = express()
const PORT = 8080       

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/static', express.static(__dirname + '/public'))
app.use('/api/productos', productRouter)
app.use('/api/carts', cartRouter)
app.use('/upload', multerRouter)

app.listen(PORT,() => {
    console.log("Server on port", PORT)
})