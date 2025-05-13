// -------------------
// CREATING SLASH COMMANDS - 5/12/2025

// The class SlashCommandBuilder is extracted from the Discord.JS package.
const { SlashCommandBuilder } = require('discord.js');

// Node.JS has a built-in object called module.exports that basically will allow what is inside it to be used in other files.
// This happens the same way require is used to extract data from files or packages.
module.exports = {
    // data is a property used to store the object made with the template of SlashCommandBuilder.
    // the template of that class allows methods such as setName and setDescription.
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
    // execute is another property used to store the asynchronus function which in this case is execute
    // the parameter interaction comes from Discord itself, it is recieved when a command is called using an instance of CommandInteraction.
    // await is used in an async function to pause the function and allow the rest of the program to continue while the await line resolves
	async execute(interaction) {
		await interaction.reply('Pong!');
	}
};

// -------------------