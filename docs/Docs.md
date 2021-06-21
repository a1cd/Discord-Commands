## Command
```js
new Cmd(name, id, command, help?, subcommands?)
```
- name - the name trigger for the command
- id - a number representing the command id (useless)
- command - a function that is triggered when the command is used on a discord serer. `(input, message, cmd) => {}`
- help [*optional*] - a help message
- subcommands [*optional*] - a list of subcommands. subcommands are triggered in *Discord* like so: `commandName subcommandName`