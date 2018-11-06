
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

const messages = [1,2,3,4,5,6,7,8,9,0];
let message = '';

const sleep = (time) => {
  return new Promise((resolve, reject)=>{
    setTimeout(()=>{
      resolve();
    }, time)
  })
};

io.engine.generateId = (req) => {
  return "abc"; // custom id must be unique
}

io.on('connect', async (socket) => {
  console.log('connect ' + socket.id);

  // setInterval(() => {
  //   socket.emit('message', new Date());
  // }, 1000);

  for (let message of messages) {
    console.log('Emiting message %s to %s', message, socket.id)
    socket.emit('message', message, (ack) => {
      console.log('Ack %s from %s', ack, socket.id)
      console.log()
    });
    await sleep(1000);
  }

  socket.on('disconnect', () => {
    console.log('disconnect ' + socket.id)
  });
});

server.listen(port, () => console.log('server listening on port ' + port));
