// test files should not be used as examples of code *EVER*
const Commands = require('./testCommandStructure')
const {command} = require('../../../index');
const assert = require("assert")

let hi = ()=>{}

assert.strictEqual(Commands.test("!hi").commandFunction.toString(), hi.toString())