var util = require('util');
var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: 'hXTkQoAx9NUlW2DfMUOCQ',
  consumer_secret: 'gmIXIkWMc6oycGI9wBrGNXCmWFiixAU952ZDyNigQ',
  access_token_key: '15810455-kUvb1xMD3yIfzxfJQFTuOdPCk6xv8jfsFK9gY84wJ',
  access_token_secret: 'CY6y3z9bEAqHXQVP3AL6rIMWylCXYqlVELtNWWhknk'
});



twit.stream('user', {track:'nodejs'}, function(stream) {
      stream.on('data', function (data) {
        console.log(data);
      });
      stream.on('end', function (response) {
        // Handle a disconnection
      });
      stream.on('destroy', function (response) {
        // Handle a 'silent' disconnection from Twitter, no end/error event fired
      });
      // Disconnect stream after five seconds
      setTimeout(stream.destroy, 5000);
    });
