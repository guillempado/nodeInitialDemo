"use strict";

const error = ((req, res) => {
  res.status(404).json({message:'404',error: 'Page not found'})
 
})
module.exports = error