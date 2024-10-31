// Component created and intended to work as a proxy for websocket implementation
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
    '/socket.io',
    createProxyMiddleware({
        target: 'http://localhost:9082', 
        changeOrigin: true,
        ws: true, 
    })
);

app.listen(3001, () => {
    console.log('Proxy server running on http://localhost:3001');
});
