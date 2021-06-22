/**
   * @typedef {Object} CommandOptions
   * @property {String} name - The text trigger for the command.
   * @property {Number} id - The id of the command
   * @property {(input: String, message: Discord.Message, command: Cmd) => {}} commandFunction
   * @property {String | null} help - The help message that is displayed when the help command is triggered
   * @property {Cmd[] | null} subcommands - All subcommands
   * @property {Discord.Client} bot - Discord bot for the command
   */

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
   * @description create the command!!!
   * @param {CommandOptions} options
   */
  constructor(options) {
    console.log(options);
    this.name = options.name.trim()
    this.help = options.help.trim() || "There is no help page for this command!"
    this.subcommands = options.subcommands || []
    this.commandFunction = options.commandFunction
    this.bot = options.bot || null
    if (options.bot) {
      this.reindex(this.bot)
    }
  }
  /**
    * @param {String} text - the filtered text
    * @param {Discord.Message} message - the raw message sent
    */
  test(text, message) {
    let result = this.find(text, (command)=>{
      if(!command.subcommands.length || command.subcommands){
        return true
      }
      return false
    })
    if (result.commandFunction) {
      result.commandFunction(text, message, result)
    }
  }
  /**
   * 
   * @param {String} command - the command string
   * @returns 
   */
  find(command, matcher = (cmd)=>{return true}) {
    if (command.trimStart().startsWith(this.name)) {
      var done = false
      if (this.subcommands || !this.subcommands.length) {
        for (let i = 0; i < this.subcommands.length; i++) {
          const subcommand = this.subcommands[i];
          var currentTest = subcommand.find(command.trimStart().slice(this.name.length))
          if (currentTest) {
            done = currentTest
            break
          }
        }
      }
      if (!done) {
        if (matcher(this)) {
          return this
        }
      } else {
        return done
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
module.exports = command