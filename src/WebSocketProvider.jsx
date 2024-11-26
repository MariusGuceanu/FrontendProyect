import React, { createContext, useEffect, useRef, useContext, useState } from 'react';

const WebSocketContext = createContext(null);
const websocket = new WebSocket(import.meta.env.VITE_WS_URL);

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        setWs(websocket);

        websocket.onopen = () => console.log('Connected to WebSocket');
        websocket.onclose = () => {
            window.onbeforeunload = function () {
                ws.close();
            }
            console.log('WebSocket connection closed')
        };
        websocket.onerror = (error) => console.error('WebSocket error:', error);

    }, []);

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => {
    return useContext(WebSocketContext);
};

