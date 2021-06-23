const {command} = require('../../../index');
let hi = ()=>{}
let bye = ()=>{console}
var Commands = new command({name: "!", commandFunction: ()=>{}, bot: {bot: "bot", isBot: true}, help: "", subcommands: [
  new command({name: "hi", commandFunction: hi, help: "say hi"}),
  new command({name: "time", commandFunction: bye, help: "tim Tom", subcommands: [
    new command({name: "get", commandFunction: hi, help: "time hi"}),
    new command({name: "set", commandFunction: bye, help: "tim Tom"})
  ]})
]})
module.exports = Commands