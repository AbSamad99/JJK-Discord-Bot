/*Checks to see which emote command was input*/

const addEmoteCommand = require('../../Commands/Emote/addEmoteCommand.js');
const editEmoteCommand = require('../../Commands/Emote/editEmoteCommand.js');
const archiveOrDeleteEmoteCommand = require('../../Commands/Emote/archiveOrDeleteEmoteCommand.js');

const emoteCommandTypeCheck = (msg, keyword) => {
  try {
    //addEmoteCommand
    if (
      keyword === 'addemote' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      addEmoteCommand(msg);
    }

    //deleteEmoteCommand
    else if (
      keyword === 'deleteemote' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      archiveOrDeleteEmoteCommand(msg, 'delete');
    }

    //editEmoteCommand
    else if (
      keyword === 'editemote' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      editEmoteCommand(msg);
    }

    //archiveEmoteCommand
    else if (
      keyword === 'archiveemote' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      archiveOrDeleteEmoteCommand(msg, 'archive');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = emoteCommandTypeCheck;
