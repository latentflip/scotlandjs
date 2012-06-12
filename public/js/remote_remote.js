var Remote = (function() {
  var socket = io.connect(document.location.protocol + '//' + document.location.hostname),
    navigate = function(direction) {
      socket.emit('navigate', {direction: direction});
    },
    navigateUp = function() { navigate('up'); },
    navigateDown = function() { navigate('down'); },
    navigateLeft = function() { navigate('left'); },
    navigateRight = function() { navigate('right'); },

    dom = {},

    initialize = function() {
      dom.controls = {};

      dom.controls.all = document.querySelector('.controls a');
      dom.controls.up = document.querySelector('.controls .up');
      dom.controls.down = document.querySelector('.controls .down');
      dom.controls.left = document.querySelector('.controls .left');
      dom.controls.right = document.querySelector('.controls .right');
      
      dom.controls.all.addEventListener( 'click', function(e) { e.preventDefault(); }, false);
      dom.controls.up.addEventListener( 'click', navigateUp, false );
      dom.controls.down.addEventListener( 'click', navigateDown, false );
      dom.controls.left.addEventListener( 'click', navigateLeft, false );
      dom.controls.right.addEventListener( 'click', navigateRight, false );
    };

  return {
    initialize: initialize,
    socket: socket,
    navigateUp: navigateUp,
    navigateDown: navigateDown,
    navigateLeft: navigateLeft,
    navigateRight: navigateRight,
    dom: dom
  };



})();

