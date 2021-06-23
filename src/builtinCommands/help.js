/**
 * @param {String} inp 
 * @param {Discord.Message} msg 
 * @param {Cmd} cmd 
 */
function help(inp, msg, cmd) {
    msg.reply(cmd.help)
}
module.exports = help