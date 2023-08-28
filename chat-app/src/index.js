const http = require('http');

const express = require('express');
const app = express();

const socketio = require('socket.io');

const server = http.createServer(app)
const io = socketio(server);

const path = require('path');
const publicDirectoryPath = path.join(__dirname, '../public');
app.use(express.static(publicDirectoryPath));

const Filter = require('bad-words')

const {generateMessage,generateLocationMessage} = require('./utils/messages')

app.use(express.static(path.join(__dirname, '../public')));
// console.log(path.join(__dirname, '../public'))

io.on('connection',(socket) => {
    // run for the each new connection
    console.log("new connection");

    // send event on client side (event name , data)
    socket.emit('message',generateMessage('Welcome!'))

    // sent to all connected user
    socket.broadcast.emit('message',generateMessage('New user join'))

    //listen on event sendmessage
    socket.on('sendmessage',(message,callback)=>{

        const filter = new Filter()

        if(filter.isProfane(message)){
            return callback('Profanity not allow')
        }

        //fire message on each connected client
        io.emit('message',generateMessage(message))
        callback('Delivered!')
    })
    //listen on sendlocation event
    socket.on('sendlocation', (getlocation,callback) => {
        io.emit('locationmessage',generateLocationMessage(`https://www.google.com/maps?q=${getlocation.latitude},${getlocation.longitude}`))
        callback()
    });

    socket.on('disconnect',()=>{
        io.emit('message',generateMessage('user left'))
    })

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