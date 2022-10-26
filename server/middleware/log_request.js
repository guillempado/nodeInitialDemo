
// Fa log del request per debug

module.exports = (req, res, next) => {
    console.log(req)
    next()
}