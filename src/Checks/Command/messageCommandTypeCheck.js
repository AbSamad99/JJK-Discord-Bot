/*Checks to see which type of bot message command was input by the mod*/

const botMessageCommand = require('../../Commands/Messaging/botMessageCommand.js');
const botEmbedMessageCommand = require('../../Commands/Messaging/botEmbedMessageCommand.js');

const messageCommandTypeCheck = (msg, keyword) => {
  try {
    //bot message command
    if (
      keyword === 'message' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      botMessageCommand(msg);
    }

    //bot embed message command
    else if (
      keyword === 'embedmessage' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      botEmbedMessageCommand(msg).catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = messageCommandTypeCheck;
