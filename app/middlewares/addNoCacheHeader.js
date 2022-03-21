// Nivell 2 Exercici 1

function addNoCacheHeader(req, res, next){
    res.set('Cache-control', 'no-cache')
    next()
}

module.exports = addNoCacheHeader