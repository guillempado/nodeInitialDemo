const express = require("express"); 
const cors = require('cors');
const app = express();
const path = require('path');

const {cache, authe} = require('./middlewares/middleware.js')
const  uploadimgs  =  require('./upload/img.js')

//middlewares
app.use(express.json())
app.use(cors());
app.use(authe)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/user', function (req, res) { 
    res.json({
        nom : 'Laura',
        edad: 31,
        url:'http://localhost:9000/'
    }); 
  });

app.post('/upload', uploadimgs.single('imagen2') , function(req, res){ //aquí pongo el middleware de la imagen, para que no afecte a todas las rutas, sola ha ésta
  if(req.errorValidation){
    res.status(400).send({message: req.errorValidation})
  }
  res.status(200).send({success: true})
  
});




app.post('/time', cors(), authe, cache, function (req, res){ // nose si hay que poner también aquí el cors
   const body = req.body
  
   res.json({
     fecha:  new Date().toDateString(),
     hora:  new Date().getHours()
   })
  
});




app.listen(9000, () => { 
console.log("El servidor está inicializado en el puerto 9000"); 
});