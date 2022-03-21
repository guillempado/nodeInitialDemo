const express = require('express');


const user = require('./routes/user')
const upload = require('./routes/upload')
const time = require('./routes/time')
const defaultRoutes = require('./routes/defaultRoutes')


const app = express();
app.use('/user', user)
app.use('/upload', upload)
app.use('/time', time)
app.use('/', defaultRoutes)

const server = app.listen(80, () => {
   let host = server.address().address
   let port = server.address().port

   host = host != '::' ? host : 'localhost'
   
   console.log(`Express server listening on: http://${host}:${port}`)
})