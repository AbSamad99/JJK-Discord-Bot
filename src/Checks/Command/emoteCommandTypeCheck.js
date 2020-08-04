/*Checks to see which emote command was input*/

const { roleCheck } = require('../Other/helperChecks.js');
const addEmoteCommand = require('../../Commands/Emote/addEmoteCommand.js');
const editEmoteCommand = require('../../Commands/Emote/editEmoteCommand.js');
const archiveOrDeleteEmoteCommand = require('../../Commands/Emote/archiveOrDeleteEmoteCommand.js');

const emoteCommandTypeCheck = (msg, keyword) => {
  //addEmoteCommand
  if (
    keyword === 'addemote' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    addEmoteCommand(msg);
  }

  //deleteEmoteCommand
  else if (
    keyword === 'deleteemote' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    archiveOrDeleteEmoteCommand(msg, 'delete');
  }

  //editEmoteCommand
  else if (
    keyword === 'editemote' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    editEmoteCommand(msg);
  }

  //archiveEmoteCommand
  else if (
    keyword === 'archiveemote' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    archiveOrDeleteEmoteCommand(msg, 'archive');
  }
};

module.exports = emoteCommandTypeCheck;
