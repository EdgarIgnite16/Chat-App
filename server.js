const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server)
require('dotenv').config();

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})

const port = process.env.port;
server.listen(port, () => {
    console.log("App is running at the port: " + port);
})

// async function broadcastBitcoinPrice() {
//     while(true) {
//         const price = 31750 + Math.random() * 400
//         io.emit('bitcoin-price', {
//             price: parseFloat(price.toFixed(2))
//         })
//         await delay(500);
//     }
// }

// broadcastBitcoinPrice()

