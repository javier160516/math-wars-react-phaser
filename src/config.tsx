import { io } from 'socket.io-client'

const ws = io('http://localhost:5000', {
        transports: ["websocket", "polling"]
    }
);

export { ws }