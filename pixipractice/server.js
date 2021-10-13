const app = require('express')();
const server = require('http').createServer(app);
// http server를 socket.io server로 upgrade한다
const socketIo = require('socket.io');

const userList = [];

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

// connection event handler
// connection이 수립되면 event handler function의 인자로 socket인 들어온다
io.on('connection', function(socket) {
  console.log('connection!!!');

  // 서버로부터의 메시지가 수신되면
  socket.on("join", function(userData) {
    console.log('join!!!');

    userData.socket = socket;
    userList[userData.id] = userData;
    
    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    userList[userData.id].socket.broadcast.emit('joinOtherUser', {x:userData.x, y:userData.y, id:userData.id});
  });

  socket.on("move", function({x, y, id}) {
    console.log('move!!')
    userList[id].x = x;
    userList[id].y = y;
    // 메시지를 전송한 클라이언트를 제외한 모든 클라이언트에게 메시지를 전송한다
    userList[id].socket.broadcast.emit('move', {x, y, id});
  });

});

server.listen(3000, function() {
  console.log('Socket IO server listening on port 3000');
}); 