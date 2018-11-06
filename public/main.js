'use strict';
  var socket = io();

  socket.on('connect', function(){
    console.log('connect ' + socket.id);
  });

  socket.on('disconnect', function(){
    console.log('disconnected');
  });

  socket.on('message', function(msg, ack){
    console.log('Message: '+ msg)
    ack(true)
  });

