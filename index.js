const Discord = require('discord.js');


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
// function uptime(inp, msg, cmd) {
//   function msToTime(time) {
//     function Reformat(Rounding, places, time) {
//       let tseconds1 = Math.floor(time / Rounding);
//       let tmiliseconds = time - (tseconds1 * Rounding);
//       let tmiliString = tmiliseconds.toString();
//       let milistr1 = tmiliString.padStart(places, "0");
//       return { tseconds1, milistr1 };
//     }
    
//     let { tseconds1:tseconds, milistr1:milistr } = Reformat(1000, 3, time);
//     let { tseconds1:tminuites, milistr1:secstr } = Reformat(60, 1, tseconds);
//     let { tseconds1:thours, milistr1:minstr } = Reformat(60, 1, tminuites);
//     let { tseconds1:tdays, milistr1:minhour } = Reformat(24, 1, thours);
//     var timeList = []
//     var nameList = []
//     for (let i = 0; i < [[minhour, "hour"], [minstr, "min"], [(secstr+"."+milistr), ("sec.MS")]].length; i++) {
//       const thing = [[minhour, "hour"], [minstr, "min"], [(secstr+"."+milistr), ("sec.MS")]][i];
//       if (thing[0] != 0) {
//         timeList.push(thing[0])
//         nameList.push(thing[1])
//       }
//     }
//     if (tdays == 0) {
//       return (timeList.join(":")+" ("+nameList.join(":")+")")
//     } else {
//       return (tdays.toString()+" days and "+timeList.join(":")+" ("+nameList.join(":")+")")
//     }
//   }
//   msg.reply("i have been up for "+msToTime(bot.uptime))
// }
module.exports = {
  Cmd,
  help
}
