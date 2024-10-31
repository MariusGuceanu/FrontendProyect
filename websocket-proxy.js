// Proxy server forr websocket implementation and testing
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", 
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);
    
    socket.on('newNegotiation', (data) => {
        io.emit('newNegotiation', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

server.listen(9082, () => {
    console.log('WebSocket server running on http://localhost:9082');
});
