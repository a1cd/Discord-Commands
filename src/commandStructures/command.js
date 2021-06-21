class command {
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
  help = null
  /**
    * @type {Cmd[] | null} subcommands - All subcommands
    */
  subcommands
  /**
    * @type {Discord.Client}
    */
  bot
  /**
    * @type {(input: String, message: Discord.Message, command: Cmd) => {} | null}
    */
  commandFunction
  /**
    * @param {String} name - The text trigger for the command.
    * @param {Number} id - The id of the command
    * @param {(input: String, message: Discord.Message, command: Cmd) => {}} commandFunction
    * @param {String | null} help - The help message that is displayed when the help command is triggered
    * @param {Cmd[] | null} subcommands - All subcommands
    */
  constructor(options) {
    this.name = options.name.trim()
    this.help = options.help.trim() || "There is no help page for this command!"
    this.subcommands = options.subcommands
    this.commandFunction = options.commandFunction
  }
  /**
    * @param {String} name - The text trigger for the command.
    * @param {Number} id - The id of the command
    * @param {(input: String, message: Discord.Message, command: Cmd) => {}} commandFunction
    * @param {String | null} help - The help message that is displayed when the help command is triggered
    * @param {Cmd[] | null} subcommands - All subcommands
    */
  constructor(name, commandFunction, help = null, subcommands = null) {
    this.name = name.trim()
    this.help = help.trim() || "There is no help page for this command!"
    this.subcommands = subcommands
    this.commandFunction = commandFunction
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
  /**
    * @type {Cmd | null}
    */
  parent = null
  /**
    * 
    * @param {Discord.Client} bot - the bot that will be used
    */
  reindex(bot) {
    if (this.subcommands.length != 0) {
      for (let i = 0; i < this.subcommands.length; i++) {
        const subcommand = this.subcommands[i];
        subcommand.id = i
        subcommand.bot = bot
        subcommand.parent = this
        subcommand.reindex(this.bot)
      }
    }
  }
}
new command()
module.exports = command