var socket = io.connect('http://localhost:80', { 
  'forceNew': true
}); 

socket.on('messages', data => { 
  // Logs de debug a terminal de navegador, a silenciar abans d'entregar
  // console.log(data);
  render(data);
});

render = data => { 
  var html = data.map(function(elem, index) { 
    return(`<div>
            <strong>${elem.author}</strong>: 
            <em>${elem.text}</em> </div>`);
  }).join(" ");   

  document.getElementById('messages').innerHTML = html; 
} 

addMessage = e => { 
  let message = { 
    author: document.getElementById('username').value, 
    text: document.getElementById('message').value 
  }; 

  socket.emit('new-message', message); return false; 
}