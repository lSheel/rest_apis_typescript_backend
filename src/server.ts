import express from "express";
import router from "./routes";
import db from "./config/db";
import colors from 'colors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import { swaggerUiOption } from "./config/swagger";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'


//Instancia de express
 //Conectar a la base de datos
 export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.magenta('Conexion exitosa a la base de datos'))
    } catch (error) {
        console.log(error)
        console.log(colors.bgRed.white('Hubo un error al conectarse a la base de datos'))
    }
    
 }

 //Instancia de express
 const server = express()

const corsOptions : CorsOptions= {
    origin:  function(origin, callback){
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }
        else{
            callback(new Error('Error de cors'))
        }
    }
}

server.use(cors(corsOptions))

connectDB()
server.use(express.static('public'));

//Leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router);

//Docs
server.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec, swaggerUiOption))

export default server
