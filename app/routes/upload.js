 
const UPLOAD_PATH = 'server_uploads/'

const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: UPLOAD_PATH})
const fs = require('fs');
const db = require('../utils/jsonDB');
db.connect(UPLOAD_PATH + 'files_description.json')

 
// Nivell 1 Exercici 2
router.post('/', upload.single('image'), (req, res) => {

    // Retorna codi: 'Bad Request' si no s'ha rebut file
    if(req.file === undefined){
        // console.log('No content');
        res.status(400)
        res.send({
            error: "No file was received"
        })
        return
    }

    // Desa file i descripció de file i retorna codi: 'OK' si s'ha rebut file amb extensió correcta

    const nameSplit = req.file.originalname.split('.');
    const ext = nameSplit[nameSplit.length - 1]
    // console.log(ext);

    if(nameSplit.length >= 2 && (ext == 'jpg' || ext == 'png' || ext == 'gif')){
        db.addFileData(req.file)
        res.send({
            message: 'OK'
        })
        return
    }
    
    // En cas contrari, elimina file rebut i retorna codi: 'Unsuported Media Type'
    fs.unlink(req.file.path, err => {if(err) console.log(err)})
    res.status(415)
    res.send({
        error: 'The image file has the wrong extension'
    })
})

module.exports = router