// Xero
// Xero is an open-source Discord bot, specializing the music for voice channels via the Spotify API.
// Created by Jonathan Cales
// This project is for me to grow my understanding of backend development - this is why the documentation is so large.
// A large portion of this project is being jumpstarted by Discord.JS documentation. 
// ------------------------

// BRINGING THE BOT ONLINE - 5/5/2025


// LOADING COMMAND FILES - 5/12/2025

// We're storing Node's file system module and the path utility module in these variables.
const fs = require('node:fs');
const path = require('node:path');

// This is what is called "reverse assignment".
// "Require" is just a function from Node.js used to grab from files or packages. discord.js is targeted, returning many objects from the package.
// const {} is storing specific objects from it's target.
const { Client, Events, GatewayIntentBits, Collection} = require('discord.js');
// This is doing the same thing, storing the token by pulling it from another file.
const { token } = require('./config.json');

// This is creating in instance/object.
// You are storing this instance in "const client", which is based on the "Client" class.
// "new" is the intermediary keyword or constructor to create it.
// The information passed into the Client class {intents: ...} is customizing instance behavior.
// "intents" specifically is used to tell discord what events the bot will take.
// "GatewayIntentBits" is an object from earlier, taken from Discord.js, that stores different types of intents/events.
// "Guilds" is a specific part of the GatewayIntentsObject, being a specific or general type of event/intent(s).
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();
// We're creating a path to the commands directory here.
const foldersPath = path.join(__dirname, 'commands');
// We are reading this path and storing the results of the read here in an array.
const commandFolders = fs.readdirSync(foldersPath);


// This for loop will iterate through the commandFolders array.
for (const folder of commandFolders) {
    // Once again, we are creating a path to a folder - this time doing it for each folder in commandFolders.
    const commandsPath = path.join(foldersPath, folder);
    // Reads the folder and filters through each file, returning an array of the files the folder contains.
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    // This for loop will iterate through the commandFiles array.
    for (const file of commandFiles) {
        // Again, creating a path but now to a file.
        const filePath = path.join(commandsPath, file);
        // Reading and extracting the contents of the file.
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

// This is an arrow function. It's just a smaller way to define a function.
// Our client instance is calling the "once" method, which listens to a specific event only once, and then calls a function as a result.
// The client is listening for a successful Discord connection through "Events.ClientReady". When this happens, the function triggers.
// "Events" is an object from earlier. "ClientReady" is a specific Discord event stored within this object.
// "readyClient" is an object passed as a parameter for the function for it to be used later.
// => is what will define the function, everything after it is what is going to be executed. What is before it is a parameter to pass through the function.
// "readyClient" is just the name given to the client instance (the object that the method is being called on) to pass through itself. readyClient = client when the event triggers.
client.once(Events.ClientReady, readyClient => {console.log(`Ready! Logged in as ${readyClient.user.tag}`);});

// This is an event listener waiting for an interaction to be recieved coming from a slash command that will execute the command.
client.on(Events.InteractionCreate, async interaction => {
    // This clause is added to ensure that only slash commands are handled.
    if (!interaction.isChatInputCommand()) return;
	
    // Looks for the command given the name of the interaction.
    const command = interaction.client.commands.get(interaction.commandName);

    // If it cannot be found, it returns this.
	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

    // Tries to execute a command based on the name of the interaction.
	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
		}
	}

});

// This is a standard method call, telling the client to login, using the token given from the config file.
client.login(token);

// ------------------------