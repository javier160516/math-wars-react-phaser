import { io } from 'socket.io-client'

const ws = io('https://videojuego-api.onrender.com', {
        transports: ["websocket", "polling"]
    }
);

export { ws }