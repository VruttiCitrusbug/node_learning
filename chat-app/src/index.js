const http = require('http');

const express = require('express');
const app = express();

const socketio = require('socket.io');

const server = http.createServer(app)
const io = socketio(server);

const path = require('path');
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

io.on('connection',(socket) => {
    // run for the each new connection
    console.log("new connection");

    socket.emit('message','Welcome!')

    socket.on('sendmessage',(message)=>{
        io.emit('message',message)
    })

    socket.on('sendlocation',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
    })
    // socket.emit()
    // //server(emit) a custom event to the client(recive an event)
    // socket.emit('countUpdated',count);

    // //at the browser side js fired event
    // socket.on('increment', ()=>{
    //     count++;
    //     // socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })

    //.emit ( fire event )
    //.on (listen or receive event)
})

let count = 0;

app.get('',(req, res) => {
    res.render("index"); 
})
server.listen(3000, () => {
    console.log("Server on port 3000.");
});