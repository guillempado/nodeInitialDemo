const userGet = (req, res) => { 
    let fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    res.json({
        nom : 'Laura',
        edad: 31,
        fullUrl,
    }); 
  };

  module.exports = { userGet };