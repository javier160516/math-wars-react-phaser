import { io } from 'socket.io-client'

// const ws = io('https://videojuego-api.onrender.com', {
//         transports: ["websocket", "polling"]
//     }
// );

const ws = io('http://localhost:4000', {
        transports: ["websocket", "polling"]
    }
);

export { ws }