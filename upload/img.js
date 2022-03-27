// es un middleware
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, './img')
  },
  filename: function (req, file , cb){
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const fileFilter = (req, file, cb) => {
  if(
    file.mimetype =='image/png'||
    file.mimetype =='image/jpg'||
    file.mimetype =='image/gif'
  ) {
    cb(null, true)
  } else {
    cb(null , false)
    req.errorValidation = 'wrong format, only .jpg .png and .gif is accepted'
  }
}


const uploadImgs = multer({storage, fileFilter})

module.exports = uploadImgs