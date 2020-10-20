const socketio = require('socket.io') ;

const socketIo = (server, $) => {
    const io = socketio(server);

    io.on('connect', (socket) => {
        console.log('connected to socket IO.....');
     
    });

    $.io = io;
};

module.exports = socketIo;