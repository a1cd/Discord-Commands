## Command Based Discord
*Command based discord* is a library that makes building command based discord bots easier. It allows for one to easily create commands and subcommands with help pages without much effort!

# First time with Discord.js?
This is *probably* not the place for you, but if you still want to do it, there are some examples.

# Installation
The easiest way to install is:
```
npm i command-based-discord
```
Other helpfull libraries:

```npm i simple-discord-commands``` - a set of basic commands (ping, uptime, etc.)

# Start
If you have experience with discord.js and node/npm skip to **I know what im doing**. If that doesnt apply to you, leave and learn, then come back.
## First time
Look up how to create a discord bot on youtube, and after you have gotten a ***Bot token*** come back.
### Sample Code

```javascript
const {Cmd} = require('discord-made-siple');
const Discord = require('discord.js');
const {ping, uptime, nick} = require('simple-discord-commands')

const bot = new Discord.Client();
bot.login(TOKEN)


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

var Commands = new Cmd("!", 0, ()=>{}, "", [
  ping,
  Cmd("hi", 0, hi, "say hi") // if the user runs the discord command "!hi" the bot will run the function hi
  uptime,
  nick
])

bot.on('message', msg => {
  Commands.test(msg.content, msg) // run the right command
});
```
the most important part is: 
```javascript
var Commands = new Cmd("!", 0, ()=>{}, "", [
  ping,
  Cmd("hi", 0, hi, "say hi") // if the user runs the discord command "!hi" the bot will run the function hi
  uptime,
  nick
])
```
this is where this library shines, commands and subcommands can be setup in an easy and robust way.

# Documentation
Find the documentation [here](./Docs.md)
