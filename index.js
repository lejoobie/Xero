// Xero
// Xero is an open-source Discord bot, specializing the music for voice channels via the Spotify API.
// Created by Jonathan Cales
// This project is for me to grow my understanding of backend development - this is why the documentation is so large.
// ------------------------
// BRINGING THE BOT ONLINE - 5/5/2025 J.C

// This is what is called "reverse assignment".
// "Require" is just a function from Node.js used to grab from files or packages. discord.js is targeted, returning many objects from the package.
// const {} is storing specific objects from it's target.
const { Client, Events, GatewayIntentBits } = require('discord.js');
// This is doing the same thing, storing the token by pulling it from another file.
const { token } = require('./config.json');

// This is creating in instance/object.
// You are storing this instance in "const client", which is based on the "Client" class.
// "new" is the intermediary keyword or constructor to create it.
// The information passed into the Client class {intents: ...} is customizing instance behavior.
// "intents" specifically is used to tell discord what events the bot will take.
// "GatewayIntentBits" is an object from earlier, taken from Discord.js, that stores different types of intents/events.
// "Guilds" is a specific part of the GatewayIntentsObject, being a specific or general type of event/intent(s).
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// This is an arrow function. It's just a smaller way to define a function.
// Our client instance is calling the "once" method, which listens to a specific event only once, and then calls a function as a result.
// The client is listening for a successful Discord connection through "Events.ClientReady". When this happens, the function triggers.
// "Events" is an object from earlier. "ClientReady" is a specific Discord event stored within this object.
// "readyClient" is an object passed as a parameter for the function for it to be used later.
// => is what will define the function, everything after it is what is going to be executed. What is before it is a parameter to pass through the function.
// "readyClient" is just the name given to the client instance (the object that the method is being called on) to pass through itself. readyClient = client when the event triggers.
client.once(Events.ClientReady, readyClient => {console.log(`Ready! Logged in as ${readyClient.user.tag}`);});

// This is a standard method call, telling the client to login, using the token given from the config file.
client.login(token);

// ------------------------