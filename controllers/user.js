const userGet = (req, res) => { 
    res.json({
        nom : 'Laura',
        edad: 31,
        url:'http://localhost:9000/'
    }); 
  };

  module.exports = { userGet };