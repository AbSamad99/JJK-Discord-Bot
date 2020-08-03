/*Checks to see which type of moderation command was input by the mod*/

const { roleCheck } = require('../Other/helperChecks.js');
const muteCommand = require('../../Commands/Moderation/muteCommand.js');
const banCommand = require('../../Commands/Moderation/banCommand.js');
const kickCommand = require('../../Commands/Moderation/kickCommand.js');
const strikeCommand = require('../../Commands/Moderation/strikeCommand.js');

const moderationCommandTypeCheck = (msg, keyword) => {
  //mute command
  if (
    keyword === 'mute' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    muteCommand(msg);
  }

  //ban command
  else if (
    keyword === 'ban' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    banCommand(msg);
  }

  //kick command
  else if (
    keyword === 'kick' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    kickCommand(msg);
  }

  //strike command
  else if (
    keyword === 'strike' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    strikeCommand(msg);
  }
};

module.exports = moderationCommandTypeCheck;
