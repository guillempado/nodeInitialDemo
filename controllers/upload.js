
"use strict";

// carregar un sol arxiu
const uploadPost = ((req, res) => {
  try {
    if (!req.files) {
      res.status(400).json({ message: "Bad request" });// 
     
    } else {
      // Es fa servir el nom del camp d'entrada (és a dir, "avatar") per a recuperar l'arxiu carregat
      let avatar = req.files.image;

      // S'utilitza el mètode mv() per a posar l'arxiu al directori de càrrega (és a dir, "uploads")
      avatar.mv("./uploads/" + avatar.name);

      //envia resposta
      res.status(200).json({  message: "File uploaded successfully!! Congratulations!!!" // arxiu carregat
        })
  
    }
  s
} catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = uploadPost;