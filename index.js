const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require('socket.io');
const io = new Server(server)
const path = require('path')
require('dotenv').config();


app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('user connected')
    socket.on('on-chat', data => {
        io.emit('user-chat', data)
    })
})

let port = process.env.PORT || 80;
server.listen(port, () => {
    console.log("App is running at the port: " + port);
})


