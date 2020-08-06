/*Checks to see which debate command was input*/

const addDebateCharacterCommand = require('../../Commands/Debate/addDebateCharacterCommand');
const removeDebateCharacterCommand = require('../../Commands/Debate/removeDebateCharacterCommand');
const debateCommand = require('../../Commands/Debate/debateCommand');
const { channelCheck, roleCheck } = require('../Other/helperChecks');
const getDebateNamesCommand = require('../../Commands/Debate/getDebateNamesCommand');
const editDebateCharacterCommand = require('../../Commands/Debate/editDebateCharacterCommand');

const debateCommandTypeCheck = (msg, keyword) => {
  try {
    //add Debate Character Command
    if (
      keyword === 'adddebchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      addDebateCharacterCommand(msg);
    }

    //remove Debate Character Command
    else if (
      keyword === 'remdebchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      removeDebateCharacterCommand(msg);
    }

    //edit Debate Character Command
    else if (
      keyword === 'editdebchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      editDebateCharacterCommand(msg);
    }

    //debate Command
    else if (
      keyword === 'debate' &&
      (channelCheck(msg, 'syed-bot-practice') ||
        channelCheck(msg, 'debates-and-powerscaling'))
    ) {
      debateCommand(msg);
    }

    //get debate names Command
    else if (
      keyword === 'getdebnames' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      getDebateNamesCommand(msg);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = debateCommandTypeCheck;
