require("dotenv").config()
const {command} = require('./index');
const Discord = require('discord.js');

const bot = new Discord.Client();
bot.login(process.env.TOKEN)


bot.on('ready', async () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

/**
 * @param {String} inp - input parameter given by user's message
 * @param {Discord.Message} msg - the raw discord message
 */
function hi(inp, msg) {
  msg.reply("yo!") // reply to the user "yo!"
}

var Commands = new command({name: "!", commandFunction: ()=>{}, bot: bot, help: "", subcommands: [
  new command({name: "hi", commandFunction: hi, help: "say hi"}) // if the user runs the discord command "!hi" the bot will run the function hi
]})

bot.on('message', msg => {
  Commands.test(msg.content, msg) // run the right command
});
