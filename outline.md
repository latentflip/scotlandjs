# Hello

## notes
Good morning. My name is Philip Roberts, and I want to tell you a story about a multiplayer game I built with two other people in this room, Jim who is speaking later today, and Rory Fitzpatrick (who's in the audience?).

The first thing that was interesting about this game was that it was built using websockets, so I want to share a bit about web sockets, and how we built the game to give you a flavour for them.

The second interesting thing about this game is that it was built in a very short space of time, 16 hours in fact, which taught me a few things about building JavaScript applications, which I want to share with you. 

And finally, this game is based around people, who are not online, but are in the same room as each other, reciting lines of Shakespeare - which I hope will inspire you all to think a bit about how to build stuff for the world outside the web. 


# Me, Rory, Jim, Padmini

## notes
Before I go any further I want to quickly give proper credit to the rest of the team that built the game. The two handsome men up there were the other developers I was working with: Rory Fitzpatrick in the middle, and Jim Newbery on the right. And the lovely lady is Padmini Ray Murray - our resident shakespeare expert who also worked on the game concept and the artwork.


# Culture Hacking

## notes
To give you a little background, Culture Hack Scotland is a hack weekend where a room of developers are given access to a heap of cultural data, and they try to build interesting, useful, fun and beautiful things from it. 

This year the data included things like, the energy consumption of some of edinburgh university's buildings every half hour for an entire year; and all the event information for this years Fringe. But the dataset that caught our eye was a fully marked up XML copy of Shakespeare's Macbeth.

[everything that you see before you was built between 9pm on a Friday, and 6pm the next day]


# Shakey
![Game1](http://farm8.staticflickr.com/7062/7123158567_95ff376ef4_c.jpg)
![Game2](https://img.skitch.com/20120429-ckukqquy99r7jhh179t7gqdchg.jpg)

## notes
Hopefully we can have a quick play of the game later on, but the basic premise is that as a room full of people, people can log in to play by visiting a web address on their phone, and they show up in the theatre on a big projector screen. Most of the players will be assigned audience seats, but a lucky few are selected to be on the stage of a mini shakespeake production. Once the game starts, the actors will be prompted on their phones with their lines when it is there turn. Meanwhile the audience can indicate how good they think the actor is doing by throwing virtual flowers.


# Websockets::Hands Up

## notes
Before I go any further, [can I get a show of hands].


# Websockets

## notes
So in our game, we effectively have a single game-server, which is what is running on the projector, and multiple clients which are what is running on the player's phones. Just to make it slightly confusing, both the game-server and the client are running in browseres, ie "on the client" - but for this talk we can [pretty much disregard the server in the traditional sense as it's not doing much except serve static assets - so if I accidentally say server instead of game-server, I mean the game-server].

All these devices communicate with each other over websockets using a service called Pusher. Websockets provide a protocol which allows browsers and servers to communicate with each other in real time - seperately from the traditional request-response cycle of the web. Pusher is a service that is implemented on top of websockets, simplifying both the implementation of a websocket based system, [as well as a hosted service, easy, aweesome etc].


# Simple Example

## notes
Here's a really simple example of how to communicate between a traditional webserver, say in node.js, and a browser using pusher.

So in the server, we set up the pusher client library with our api information - simple enough. Then we name a channel which we want to communicate over - in a more complicated application you might have multiple different channels, but here we just need one. Then we can trigger a named event, in this case "message" on the channel, which you can think of as saying, send this json object to all the connected clients via pusher.

On the client, we can just connect to that channel, and set up an event handler (very similar to DOM event handlers which you might be used to) that says, if there is an event called "message" on the channel, run this call back, which in this case is an alert.


# Powerful

## notes

So that looks pretty simple, but it's already pretty powerful. 
