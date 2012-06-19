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


# Shakey, or, A massively multiplayer shakespeare recital with tomatoes and fart sounds - over websockets

## notes

The game that we came up with, we ended up calling shakey. Ultimately it's a way to get a large room of people, like this one, interacting with each other via a public performance of a small section from Shakespeare's Macbeth - but in an interactive and modern way - hence the websockets.


# Shakey
![Game1](http://farm8.staticflickr.com/7062/7123158567_95ff376ef4_c.jpg)
![Game2](https://img.skitch.com/20120429-ckukqquy99r7jhh179t7gqdchg.jpg)

## notes

Here are a couple of photographs of the game in action. So here's what happens. First, using their mobile phones, a large room of people all register to play by visiting a web address on their phone, entering their twitter handle, and they will show up in the "theatre" on a big projector screen.

Most of the players will be assigned audience seats, but a lucky few are selected to be on the stage of a mini shakespeake production. Once the game starts, the actors will be prompted on their phones with their lines when it is there turn. Meanwhile the audience can indicate how good they think the actor is doing by throwing virtual flowers, or more amusingly tomatoes with accompanying splat sounds.

[more here?]

So that's a
 quick background to where this game came from - we'll try and have a play before Q and A, but before then I want to take you through a quick introduction to websockets so that we are all on the same page, then I would like to take you through how we built the game, and finish with some things I've learned from the experience that I would like to share.


# Websockets::Hands Up

## notes
Before I go any further, can I get a show of hands for anyone who's using websockets extensively already, maybe in your day job, or other big app you're running? [...] Okay and who has tinkered with websockets a bit, or at least knows roughly what I am talking about? [...]


# Websockets

## notes

Websockets are a fairly new web technology, that are to some extent still a work in progress - but all the latest versions of the major browsers support them. 

We built our game using a hosted service called Pusher. Pusher implements a messaging service on top of websockets that makes it really easy to effectively send messages as json objects between servers and browsers, or indeed two seperate browsers, it has a number of benefits over native websockets, but for us the big wins were that they provide a hosted websockets service, so you don't have to host or scale a websocket server yourself, and it also has fallback support for browsers that don't support websockets using more available technologies.


# Simple Example

## notes
So here is a super simple example of how you can push data from a server to a browser, or number of browsers, in real-time, without needing a seperate request-response cycle over pusher.

In this example, say we wish to send messages, like tweets, to a number of followers, and have them show up in the clients. [... opening the browser...].

So here's what the client code looks like, running in a browser. When the client opens up, it initializes a connection to Pusher, which internally will setup a websocket connection to Pusher's servers. We also connect to a specific channel - larger applications may have multiple event channels, but we just need one. The client then listens to that channel, and triggers a callback every time a message titled 'tweet' is triggered. This callback just raises an alert box, pretty simple stuff.

On the "server" side, in this case just a little node.js script, we again can setup a connection to pusher. And this time we trigger a tweet event, with some message content.

And when I do that, bam [as long as I have a web connection], the client responds to the message in real time, without ajax polling etc.

Something to notice about this, which is pretty cool, is that the api and code for dealing with these events, or messages, from pusher looks a lot like the code we would write to bind to dom events, like a user clicking on a button, but this time the events are in fact triggered from some other machine on the internet, rather than locally.

[back to the slide]

So this is obviously a very simple example, but I feel like it already shows the power, and simplicity, of what websockets provide us. 

And with a little bit of wrangling, we can get Pusher to allow us to send messages directly between one client that's using our application and another one - which is what we ended up doing in our game.

The whole thing is really quite a simple concept actually: when I first read about websockets, wikipedia defined them as a technology for providing full-duplex, bi-directional communication channel over a TCP connection, which all sounds a bit hairy - but using a service like pusher this is pretty much it: we can send events, and json data between computers, in real time, and use it do cool stuff!


# The Game

Rather than showing you further random examples, I figured I would dig into the game, to see how we architected and built the game using websockets, and how that process evolved.


# Architecture

So in our game we don't really have a server in the traditional sense, we do have a rails app but all it does is send html and javascript assets to the clients - everything interesting runs in the browser.

We do have two different types of client application though. Running on the projector, is our game-server. That's the canonical place where the game happens - that's where the game-clients register to, and the game state is held. Then we have the game-clients, which are running on the players mobile phones, which is a seperate set of assets which allow players to send or receive events, and interact with the game.

And as we've shown the game-servers and game-clients all interact over pusher.


# Building

## Splitting
Once we had figured out the basic architecture we split into two teams to develop the game. Jim focussed on building the game-client application that would be running on the audience's mobile phones, whilst Rory and I developed the game-server that is what's run on the projector.

## UI
The first thing we all did was to scribble down some rough screens on a whiteboard to define how we thought the game would play out, both on people's phones and on the projector screen. 

## Defining Events

From there we realised we needed to define the messages that would be sent over pusher, that would make up the interaction of the game. Literally on the wall, we listed the messages, and data that would be sent between the clients and game-server.

For me, this was the KEY step in developing the game. It was at this point we all got on the same page about what events we would all be supporting, we also defined a common language for our game: do players "act" lines, or "deliver" them, or "say" them? Do audience members "chuck", or "hurl", or "throw" tomatoes?

It sounds like semantics, but we had to agree on this stuff for the application to work, and by thinking about it I think we all felt like we were definitely on the same page. Which can often be an important step when you are seperately trying to build something in a very short space of time.


## Game-Server

The game server was built in coffee-script and backbone. I won't delve too deeply into it - but what was unusual is that it was a backbone application that was interacting with almost no user-driven events. In a normal backbone application you are constantly binding to DOM events, like "when user clicks this button, do something", but here all our events were messages coming over Pusher. What was interesting though was that it didn't really feel diffetrent to the normal way I would developed a backbone application, ultimately you are still listening and responding to events, they just happen to be coming from a different place.


## Game-Clients

Jim's game clients didn't really need to store any of the game state particularly. Instead it was either responding to events from Pusher, such as taking the set of lines a user had to say, and showing them on the screen; or it was taking user interaction, like a user clicking on the 'throw flowers' button, and converting them into pusher events for the game-server.
 
So without digging in too deep into the intricacies of the code [...] That takes me on to the learnings.


# Learnings

The first was that because we had this very narrow channel over which the clients could communicate, with very well defined messages, the game-server and game-client were completely seperate modules. In fact Jim built the phone applications in native javascript, while rory and I built the game-server in coffeescript because that's what we knew - but it wasn't a problem at all, indeed, one of us could have easily built their part in some other framework like ember and it wouldn't have made a difference.

# Event driven programming

This leads into a bigger lesson for me and that is the power of event-driven programming when developing client side applications.

In my day job, I have been moving a "traditional" web programming in rails where we were sending html over the wire with some jquery spaghetti code, into a more stateful javascript heavy application in Backbone. I have been learning about event-driven programming as a way to decouple large applications, but old habits die hard when you've come from a more procedural, ruby background.

When developing this game though, it was all built around pusher's event feed, we had up-front, on the wall, defined every event that was relevant to our application. This made it really easy to add functionality in completely seperate modules at a later stage. 

For example, we decided to add a game log down the side of the screen to show what had been going on in the game - and we realised that it doesn't really care about users, or scores, or when the game starts or ends - all it cares about is listening to certain events, and updating the DOM. So it can just sit, listen to the event feed from Pusher and update itself - and it doesn't need to know anything about the rest of the application and vice-versa.

This was a clear demonstration of the power of an event driven approach which I will definitely take back to my day job.


# Events on the wall

Having the events literally, written on the wall, had a further benefit though, and that was in our mutual understanding and language for what we were building. 

And I feel like that ties in nicely with some of the discussion I have seen recently, particularly in the ruby community, of this concept that the application that you are building doesn't really exist in the data objects that you are working with - although that's what we tend to focus on is, users, accounts, tweets - it's more about how these objects interact, and the messages we are passing around, where we expose the uniqueness of an application. 

Pusher, by forcing us to define those messages, in a language that we could all agree on, really helped demonstrate how important that concept is to me.


# Websocket madness

So I'll leave you with a medical condition that I am sure we will see afflicting future real-time web programmers, and that is "websocket madness". Websockets are a complete [mindfuck] when you start working with them. Particularly when you are using a service like Pusher.

When building traditional applications, we are not used to clients, which are not directly connected, communicating with each other. When building traditional applications, you think "i know, i'll just fire up my development server to try something out", that won't have any effect on the real world. 

[.....................]

