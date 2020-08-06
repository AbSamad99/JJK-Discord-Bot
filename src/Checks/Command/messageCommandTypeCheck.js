/*Checks to see which type of bot message command was input by the mod*/

const { roleCheck } = require('../Other/helperChecks.js');
const botMessageCommand = require('../../Commands/Messaging/botMessageCommand.js');
const botEmbedMessageCommand = require('../../Commands/Messaging/botEmbedMessageCommand.js');

const messageCommandTypeCheck = (msg, keyword) => {
  try {
    //bot message command
    if (
      keyword === 'message' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      botMessageCommand(msg);
    }

    //bot embed message command
    else if (
      keyword === 'embedmessage' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      botEmbedMessageCommand(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageCommandTypeCheck;
