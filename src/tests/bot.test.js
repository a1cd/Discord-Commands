const { group, test, command, beforeStart, afterAll } = require("corde");
const {ping, uptime} = require('simple-discord-commands')
const Discord = require("discord.js")

beforeStart(() => {
    const bot = new Discord.Client();
    const TOKEN = process.env.TOKEN
    bot.login(TOKEN)
    bot.on("message", (msg)=> {msg.reply("pong")})
});

group("main commands", () => {
  test("!ping command must return... pong", () => {
    expect("ping").toReturn("@BotBotTest pong");
  });
});

afterAll(() => {
  bot.destroy();
});