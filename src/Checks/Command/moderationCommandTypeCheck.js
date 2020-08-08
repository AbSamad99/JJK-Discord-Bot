/*Checks to see which type of moderation command was input by the mod*/

const muteCommand = require('../../Commands/Moderation/muteCommand.js');
const unMuteCommand = require('../../Commands/Moderation/unmuteCommand.js');
const banCommand = require('../../Commands/Moderation/banCommand.js');
const kickCommand = require('../../Commands/Moderation/kickCommand.js');
const strikeCommand = require('../../Commands/Moderation/strikeCommand.js');
const unstrikeCommand = require('../../Commands/Moderation/unStrikeCommand.js');

const moderationCommandTypeCheck = (msg, keyword, myCache) => {
  try {
    //mute command
    if (
      keyword === 'mute' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      muteCommand(msg, myCache);
    }

    //unmute command
    if (
      keyword === 'unmute' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      unMuteCommand(msg, myCache);
    }

    //ban command
    else if (
      keyword === 'ban' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      banCommand(msg);
    }

    //kick command
    else if (
      keyword === 'kick' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      kickCommand(msg);
    }

    //strike command
    else if (
      keyword === 'strike' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      strikeCommand(msg).catch(console.log);
    }
    //unstrike command
    else if (
      keyword === 'unstrike' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      unstrikeCommand(msg).catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = moderationCommandTypeCheck;
