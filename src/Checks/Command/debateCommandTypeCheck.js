/*Checks to see which debate command was input*/

const addDebateCharacterCommand = require('../../Commands/Debate/addDebateCharacterCommand');
const removeDebateCharacterCommand = require('../../Commands/Debate/removeDebateCharacterCommand');
const debateCommand = require('../../Commands/Debate/debateCommand');
const { channelCheck, roleCheck } = require('../Other/helperChecks');
const getDebateNamesCommand = require('../../Commands/Debate/getDebateNamesCommand');

const debateCommandTypeCheck = (msg, keyword) => {
  //add Debate Character Command
  if (
    keyword === 'adddebatecharacter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    addDebateCharacterCommand(msg);
  }

  //remove Debate Character Command
  else if (
    keyword === 'removedebatecharacter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    removeDebateCharacterCommand(msg);
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
    keyword === 'getdebatenames' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getDebateNamesCommand(msg);
  }
};

module.exports = debateCommandTypeCheck;
