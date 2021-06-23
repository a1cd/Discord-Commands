![banner](./img/Easy-Banner.png)
# Command Based Discord
[![Built With Love](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com)
[![Made With Javascript](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)
[![Powered By Electricity](https://forthebadge.com/images/badges/powered-by-electricity.svg)](https://forthebadge.com)

[![npm version](https://badge.fury.io/js/command-based-discord.svg)](https://badge.fury.io/js/command-based-discord)

Command based discord is a library that makes building command based discord bots easier. It allows for one to easily create commands and subcommands with help pages without much effort!
## First time with Discord.js?
This is probably not the place for you, but if you still want to do it, there are some examples.

# Installation   ![how do i install](https://img.shields.io/badge/how%20do%20i-install-ED4245?logo=discord&style=for-the-badge&labelColor=57F287)
The easiest way to install is:

```bash
npm i command-based-discord
```
Other helpful 'sister' libraries:

- [`npm i simple-discord-commands` (click)](https://github.com/a1cd/simple-discord-commands) - a set of basic commands (ping, uptime, etc.)
- [`npm i discord-hypixel` (click)](https://github.com/a1cd/Discord-Hypixel) - a set of commands to work well with the hypixel api and users
# Start   ![where do i start?](https://img.shields.io/badge/Where-Do%20I%20start-EB459E?style=for-the-badge&labelColor=000000)
If you have experience with discord.js and node/npm skip to I know what im doing. If that doesnt apply to you, leave and learn, then come back.

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
