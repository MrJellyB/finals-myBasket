

import { Component, OnInit } from '@angular/core';
//import { io } from "socket.io";


@Component({
  selector: 'app-sockets',
  templateUrl: './sockets.component.html',
  styleUrls: ['./sockets.component.css']
})



export class SocketsComponent implements OnInit {
  constructor() { }
  ngOnInit() { }

  };
/*
  var express = require('express')
    , app = express()
    , http = require('http')
    , server = http.createServer(app)
    , io = require('socket.io').listen(server);
  server.listen(8080);


  app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
  });

  // usernames that connected to the chat
  var usernames = {};

  io.sockets.on('connection', function (socket) {
  
    // when the client emits 'sendchat', this listens and executes
    socket.on('sendchat', function (data) {
      // we tell the client to execute 'updatechat' with 2 parameters
      io.sockets.emit('updatechat', socket.username, data);
    });

   
    socket.on('adduser', function (username) {
     socket.username = username; // save the username in the socket
     usernames[username] = username; // add the username to the list
     socket.emit('updatechat', 'SERVER', 'you have connected');
     socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected'); // notified all clients about the new user
     io.sockets.emit('updateusers', usernames); // update the list of users in chat (client-side)
   });

    socket.on('disconnect', function () {
      delete usernames[socket.username];// delete for the list
      io.sockets.emit('updateusers', usernames);// update the chat (client-side)
      socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
   });
  });
*/




