import socketio from 'socket.io';

export const socketIo = (server) => {
    const io = socketio(server);
    const admin = io.of('/admin');

    // main namespace 
    io.on('connect', (socket) => {
        socket.emit('serverMessage', {
            from: 'server',
            message: 'hello client'
        });
    });

    // admin namespace
};
