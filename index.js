require('dotenv').config();
const Discord = require('discord.js');
const mongo = require('mongodb');
const bot = new Discord.Client();
const TOKEN = process.env.TOKEN

const MongoClient = require('mongodb').MongoClient;

const test = require('assert');

// Connection url

const url = 'mongodb://localhost:27017';

// Database Name

const dbName = 'discord';

// Connect using MongoClient

bot.login(TOKEN)

bot.on('ready', () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});
class Cmd {
  /**
   * @type {String}
   */
  name = null
  /**
   * @type {Number}
   */
  id = null
  /**
   * @type {String} - The help message that is displayed
   */
  help = null
  /**
   * @type {Cmd[] | null} subcommands - All subcommands
   */
  subcommands = null
  /**
   * @type {(input: String, message: Discord.Message, command: Cmd) => {}}
   */
  command = null
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
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function help(inp, msg, cmd) {
  msg.reply(cmd.help)
}
/**
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function uptime(inp, msg, cmd) {
  function msToTime(time) {
    function Reformat(Rounding, places, time) {
      let tseconds1 = Math.floor(time / Rounding);
      let tmiliseconds = time - (tseconds1 * Rounding);
      let tmiliString = tmiliseconds.toString();
      let milistr1 = tmiliString.padStart(places, "0");
      return { tseconds1, milistr1 };
    }
    
    let { tseconds1:tseconds, milistr1:milistr } = Reformat(1000, 3, time);
    let { tseconds1:tminuites, milistr1:secstr } = Reformat(60, 1, tseconds);
    let { tseconds1:thours, milistr1:minstr } = Reformat(60, 1, tminuites);
    let { tseconds1:tdays, milistr1:minhour } = Reformat(24, 1, thours);
    var timeList = []
    var nameList = []
    for (let i = 0; i < [[minhour, "hour"], [minstr, "min"], [(secstr+"."+milistr), ("sec.MS")]].length; i++) {
      const thing = [[minhour, "hour"], [minstr, "min"], [(secstr+"."+milistr), ("sec.MS")]][i];
      if (thing[0] != 0) {
        timeList.push(thing[0])
        nameList.push(thing[1])
      }
    }
    if (tdays == 0) {
      return (timeList.join(":")+" ("+nameList.join(":")+")")
    } else {
      return (tdays.toString()+" days and "+timeList.join(":")+" ("+nameList.join(":")+")")
    }
  }
  msg.reply("i have been up for "+msToTime(bot.uptime))
}
/**
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function addRule(inp, msg, cmd) {
  MongoClient.connect(url, function(err, client) {
    // Create a collection we want to drop later
    client.db(dbName).collection("rules").countDocuments().then((index)=>{
      client.db(dbName).collection("rules").insertOne({"rule":"yes", "content":inp.trim().slice(3).trim(), "index":index})
    })
  });
}
function listRule(inp, msg, cmd) {
  MongoClient.connect(url, function(err, client) {
    // Create a collection we want to drop later
    let value = client.db(dbName).collection("rules").find({"rule":"yes"})
    value.count().then((count) => {
      var reply =  count.toString() + " rules\n"
      value.forEach((doc) => {
        reply = reply + doc.content + "\n"
      })
      // reply = reply.slice(0,2)
      msg.reply(reply)
    })
  });
}
let Commands = new Cmd("!", 0, ()=>{}, "", [
  new Cmd("ping", 0, ping),
  new Cmd("rule", 1, help, null, [
    new Cmd("add", 0, addRule),
    new Cmd("list", 0, listRule)
  ]),
  new Cmd("uptime", 2, uptime, "current time online")
])
bot.on('message', msg => {
  // if (msg.channel.name.startsWith("bot")) {
    Commands.test(msg.content, msg)
  // }
  if (msg.content == "hi") {
    msg.reply("hey!")
  }
});
