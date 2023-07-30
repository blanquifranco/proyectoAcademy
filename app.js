//iniciamos requiriendo el modulo de express
const express =  require("express"); //aca ya se importa
//Se crea el objeto de nuestra app
const path = require("path"); // esto es para que de forma automatica se pueda tener la ubicacion de una ruta, es mas seguro
import morgan from "morgan"; //de esta forma puedo hacer gracias a babel, sino tenia que hacer como la linea 4
import cors from "cors";
import fileUpload from "express-fileupload";
const app = express();
//Middlewares, agente intermedio, es un sistema de software que ofrece servicios y funciones comunes para las aplicaciones
app.use(morgan('tiny')); //en la documentacion de morgan se usa tiny
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true})); //como paremetro tiene un objeto
app.use(fileUpload({useTempFiles: true})) //como parametro un objeto, uso de archivos temporales

//Routes
//pasarle alguna ruta para q pueda responder bien
app.get("/", (req, res)=>{
    //respuesta.send('Hello World'); //tipo de texto plano 
    //respuesta.sendFile("C:/Users/saldi/Desktop/EXPRESSSERVER/index.html") //recibe un string q representa la ruta absoluta del archivo html
    res.sendFile(path.join(__dirname + "/index.html")) ;//el dirname representa la ruta raiz de nuestro proyecto, entonces ya simplemente se concatena con el archivo
});

app.use('/', require('./routes/mentor.routes'))



//Settings
//ahora necesitamos que nuestro servidor escuche por algun puerto
const puerto = 4000;
app.listen(puerto, () => {
    console.log("El servidor ya esta escuchando desde el puerto ", puerto)
}); //el segundo parametro es solo una funcion que avisa por consola que ya esta escuchando el server