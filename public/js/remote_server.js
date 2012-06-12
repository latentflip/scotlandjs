var socket = io.connect('http://localhost');
socket.on('navigate', function (data) {
  switch(data.direction) {
    case 'up':
      Reveal.navigateUp();
      break;
    case 'down':
      Reveal.navigateDown();
      break;
    case 'left':
      Reveal.navigateLeft();
      break;
    case 'right':
      Reveal.navigateRight();
      break;
    default:
      //noop
  }
});

var triggerNavigated = function() {
  console.log('navigated');
  socket.emit('navigated', { routes: Reveal.availableRoutes() });
};

Reveal.addEventListener('slidechanged', triggerNavigated, false);
