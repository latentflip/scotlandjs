var Pusher = require('node-pusher');

var pusher = new Pusher({
      appId: '19462',
      key: 'aa16fedd0ca224252c4d',
      secret: '17b9668855f0d04bd160'
    });

var channel = 'chatroom';
var event = 'message';
var data = {
    from: 'Jaewoong',
    content: 'Hello, World'
};

// (optional) socket_id is used to prevent getting message for myself
// // http://pusher.com/docs/publisher_api_guide/publisher_excluding_recipients
var socket_id = '1302.1081607';
//
pusher.trigger(channel, event, data)//, socket_id, function(err, req, res) {
//   // do something (this callback is optional)
//   });
//
//   // auth function returns the object with the auth field which can be returned from our sever
//   // to authorize the socket to subscribe to a private or presence channel
//   // http://pusher.com/docs/auth_signatures
//   pusher.auth(socket_id, channel, channelData);
