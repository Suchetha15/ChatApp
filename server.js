const path = require('path');
const express = require('express');
const app = express();
var http = require('http').Server(app);
const publicPath = path.join(__dirname,'public')

var connections = [];
var users = [];
http.listen(3000, '0.0.0.0', function() {
    console.log('Listening to port:  ' + 3000);
});
const port = process.env.PORT || 3000;
var server = app.listen(port);
app.use(express.static(publicPath));
//const io = socketIO(server);
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){

    socket.once('disconnect', function(){
        for(var i = 0; i< users.length; i++) {
            if(users[i].id == this.id){
                users.splice(i, 1);
            }
        }


       connections.splice(connections.indexOf(socket),1);
       socket.disconnect();
       console.log('Disconnected: %s sockets connected', connections.length);

        io.emit('disconnect', users);
    });


    socket.on('messageAdded', function(payload){
        var newMessage = {
            timeStamp: payload.timeStamp,
            text: payload.text,
            user: payload.user
        }

        io.emit('messageAdded', newMessage);
        console.log(payload);
    });
    socket.on('userJoined', function(payload){
        var newUser = {
            id: this.id,
            name: payload.name
        }
        users.push(newUser);
        io.emit('userJoined', users);
        
    });
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);
});

console.log('Server is up');

