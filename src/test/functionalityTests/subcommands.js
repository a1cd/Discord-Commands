// test files should not be used as examples of code *EVER*
const Commands = require('./testCommandStructure')
const {command} = require('../../../index');
const assert = require("assert")

let hi = ()=>{}

assert.strictEqual(Commands.test("!time get").commandFunction.toString(), hi.toString())
assert.strictEqual(Commands.test("!time get").help, "time hi")