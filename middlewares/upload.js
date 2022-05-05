const multer = require('multer')
const path = require('path')

let fileFilter = (req, file, cb) => {
    const fileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

    if (fileTypes.some(fileType => fileType === req.files.image.mimetype)) return cb(null, true);

    return cb(new Error('Valid files only with the following extensions .jpeg/.jpg, .png and .gif'), false);
}

module.exports = fileFilter;
