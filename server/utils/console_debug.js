
// Imprimeix missatges de debug només si estem en debug
const debug_log = process.env.IS_PROD === "true" ?
            message => {} :
            message => {console.log(message)}

module.exports = { debug_log };