// test files should not be used as examples of code *EVER*
const Commands = require('./testCommandStructure')
const {command} = require('../../../index');
const assert = require("assert")

assert.strictEqual(Commands.test("!hi ").bot.bot, "bot")
assert.strictEqual(Commands.test("!hi").id, 0)