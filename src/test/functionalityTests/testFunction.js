// test files should not be used as examples of code *EVER*
const Commands = require('./testCommandStructure')
const {command} = require('../../../index');
const assert = require("assert")

console.log(Commands.test("!hi"))
let test1 = Commands.test("!hi")
if (test1 == null) {
    assert.fail()
}