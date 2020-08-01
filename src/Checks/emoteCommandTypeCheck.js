/*Checks to see which emote command was input*/

const { roleCheck } = require('./helperChecks.js');
const addEmoteCommand = require('../Commands/Emote/addEmoteCommand.js');
const deleteEmoteCommand = require('../Commands/Emote/deleteEmoteCommand.js');
const editEmoteCommand = require('../Commands/Emote/editEmoteCommand.js');
const archiveEmoteCommand = require('../Commands/Emote/archiveEmoteCommand.js');

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
    deleteEmoteCommand(msg);
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
    archiveEmoteCommand(msg);
  }
};

module.exports = emoteCommandTypeCheck;