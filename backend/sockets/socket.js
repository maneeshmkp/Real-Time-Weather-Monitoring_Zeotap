// backend/sockets/socket.js
const socketIo = require('socket.io');

let io;

const initSocket = (server) => {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};

const emitWeatherUpdate = (data) => {
    if (io) {
        io.emit('weatherUpdate', data);
    }
};

module.exports = { initSocket, emitWeatherUpdate };
