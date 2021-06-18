const { group, test, command, beforeStart, afterAll, describe } = require("corde");
const {ping, uptime} = require('simple-discord-commands')
const Discord = require("discord.js")

beforeStart(() => {
    const bot = new Discord.Client();
    const TOKEN = process.env.TOKEN
    bot.login(TOKEN)
    bot.on("message", (msg)=> {msg.reply("pong")})
});
describe("init", () => {
  test("!ping command must return... pong", () => {
    expect("ping").toReturn("@BotBotTest pong");
  })
  test("!ping command must return... pong", () => {
    expect("ping").toReturn("@BotBotTest pong");
  })
  test("!ping command must return... pong", () => {
    expect("ping").toReturn("@BotBotTest pong");
  })
  test("!ping command must return... pong", () => {
    expect("ping").toReturn("@BotBotTest pong");
  })
})
// group("main commands", () => {
// });

// afterAll(() => {
//   bot.destroy();
// });