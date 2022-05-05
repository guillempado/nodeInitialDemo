"use strict";

  // Configuración de middleware para el control de caché (métodos "POST")
  
let cacheMiddleware = (req,res,next)=>{
  if (req.method == 'POST') {
    res.set("Cache-control", "no-cache");
} else {
    res.set("Cache-control", "no-store");
}
next();
}
    

module.exports = cacheMiddleware