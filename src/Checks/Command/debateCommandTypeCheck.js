/*Checks to see which debate command was input*/

const addDebateCharacterCommand = require('../../Commands/Debate/addDebateCharacterCommand');
const removeDebateCharacterCommand = require('../../Commands/Debate/removeDebateCharacterCommand');
const debateCommand = require('../../Commands/Debate/debateCommand');
const getDebateNamesCommand = require('../../Commands/Debate/getDebateNamesCommand');
const editDebateCharacterCommand = require('../../Commands/Debate/editDebateCharacterCommand');

const debateCommandTypeCheck = (msg, keyword) => {
  try {
    //add Debate Character Command
    if (
      keyword === 'adddebchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      addDebateCharacterCommand(msg).catch(console.log);
    }

    //remove Debate Character Command
    else if (
      keyword === 'remdebchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      removeDebateCharacterCommand(msg).catch(console.log);
    }

    //edit Debate Character Command
    else if (
      keyword === 'editdebchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      editDebateCharacterCommand(msg).catch(console.log);
    }

    //debate Command
    else if (
      keyword === 'debate' &&
      (msg.channel.id === '720958791432011789' /*Syed bot practice channel*/ ||
        msg.channel.id === '713119662337949757') /*debates channel*/
    ) {
      debateCommand(msg).catch(console.log);
    }

    //get debate names Command
    else if (
      keyword === 'getdebnames' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      getDebateNamesCommand(msg).catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = debateCommandTypeCheck;
