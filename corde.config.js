const { testFilesDir, testTimeOut } = require("./Tconfig.json");

// Do not throw any error if the project in running inside CI.
if (!process.env.CI && result.error) {
  throw result.error;
}

const botPrefix = process.env.PREFIX;
const botTestId = process.env.BOT_TEST_ID;
const channelId = process.env.CHANNEL_ID;
const cordeBotToken = process.env.CORDE_BOT_TOKEN;
const testMatches = [testFilesDir];
const guildId = process.env.GUILD_ID;
const botToken = process.env.BOT_TOKEN;
const timeOut = testTimeOut;
/** @type {
  import('corde/lib/src/types').IConfigOptions
} */
module.exports = {
  botPrefix,
  botTestId,
  channelId,
  cordeBotToken,
  testMatches,
  guildId,
  botToken,
  timeOut
}