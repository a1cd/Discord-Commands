require('dotenv').config();
const Discord = require('discord.js');
const bot = new Discord.Client();
const TOKEN = "ODUzNjMxNzE2OTU3NzQ5MjU4.YMYMfQ.h-rdrC3-DsF82wSNynmvRbqw3M0";

bot.login(TOKEN);

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
class Cmd {
  /**
   * @type {String}
   */
  name
  /**
   * @type {Number}
   */
  id
  /**
   * @type {String} - The help message that is displayed
   */
  help
  /**
   * @type {Cmd[] | null} subcommands - All subcommands
   */
  subcommands = null
  /**
   * @type {(input: String, message: Discord.Message, command: Cmd) => {}}
   */
  command
  /**
   * @param {String} name - The text trigger for the command.
   * @param {Number} id - The id of the command
   * @param {(input: String, message: Discord.Message, command: Cmd) => {}} command
   * @param {String | null} help - The help message that is displayed when the help command is triggered
   * @param {Cmd[] | null} subcommands - All subcommands
   */
  constructor(name, id, command, help = null, subcommands = null) {
    this.name = name.trim()
    this.id = id
    if (help) {
      this.help = help.trim()
    } else {
      this.help = "there is no help page for this command"
    }
    this.subcommands = subcommands
    this.command = command
  }
  /**
   * @param {String} text - the filtered text
   * @param {Discord.Message} message - the raw message sent
   */
  test(text, message) {
    if (text.trimStart().startsWith(this.name)) {
      var done = false
      if (this.subcommands) {
        for (let i = 0; i < this.subcommands.length; i++) {
          const subcommand = this.subcommands[i];
          var currentTest = subcommand.test(text.trimStart().slice(this.name.length), message)
          if (currentTest) {
            done = currentTest
            break
          }
        }
      }
      if (!done) {
        if (this.command){
          this.command(text, message, this)
          return true
        }
      } else {
        return true
      }
    }
    return false
  }
}
/**
 * 
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function ping(inp, msg, cmd) {
  msg.reply("pong")
}
/**
 * 
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function help(inp, msg, cmd) {
  msg.reply(cmd.help)
}
function addRule(inp, msg, cmd) {
  msg.reply("yep")
}
let Commands = new Cmd("!", 0, ()=>{}, "", [
  new Cmd("ping", 0, ping),
  new Cmd("rule", 1, help, null, [
    new Cmd("add", 0, addRule)
  ])
])
bot.on('message', msg => {
  if (msg.channel.name.startsWith("bot")) {
    Commands.test(msg.content, msg)
  }
});
