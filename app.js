var express = require('express')
  , app = express.createServer()
  , io = require('socket.io').listen(app);

app.listen(3344);

app.configure(function(){
  app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/remote', function (req, res) {
  res.sendfile(__dirname + '/remote.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('navigate', function (data) {
    io.sockets.emit('navigate', (data));
  });
  socket.on('navigated', function (data) {
    io.sockets.emit('navigated', (data));
  });
});
