const socket = io('http://localhost:3000/');

socket.on('serverMessage', (message) => {
    console.log('message from server', message)
})

