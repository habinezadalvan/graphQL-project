import express from 'express';
import path from 'path';
import http from 'http';
import socketIO from 'socket.io';


const publicPath = path.join(__dirname, '/../public');
const app = express();

const server = http.createServer(app);

const io = socketIO(server);
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('new user connection ....');
    socket.on('disconnect', () => {
        console.log('user is disconnected ..')
    })
})

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`server is running on port ${port}`));