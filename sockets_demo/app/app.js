var express = require('express'); 
var app = express(); 
var server = require('http').Server(app); 
var io = require('socket.io')(server); 

var messages = [{ 
    author: "Guillem P.",
    text: "Missatge preexistent"
}]; 

// Serveix el client per GET request
app.use(express.static('public')); 

io.on('connection', socket => { 
    console.log('Nova connexió per sockets');
    
    // Envia missatges a client
    socket.emit('messages', messages);

    socket.on('new-message', data => { 
        
        messages.push(data);
        
        console.log('Missatges del servidor actualitzats:');
        console.log(messages);

        // Envia missatges A TOTS els clients connectats per socket
        io.sockets.emit('messages', messages); 
    }); 
}); 

server.listen(8080, function() {
    console.log("Server running on http://localhost:8080");
});
