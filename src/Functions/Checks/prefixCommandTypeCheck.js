const {
  roleAssignCommand,
  suggestionCommand,
} = require('../Commands/userCommands.js');

const {
  chapterAnnouncement,
  pollAnnouncement,
  purgeCommand,
} = require('../Commands/otherModCommands.js');

const {
  muteCommand,
  kickCommand,
  banCommand,
  strikeCommand,
} = require('../Commands/userManagementCommands.js');

const {
  botEmbedMessageCommand,
  botMessageCommand,
} = require('../Commands/botMessagingCommands.js');

const {
  encyclopediaLink,
  wikiLink,
  chartLink,
  catalogueLink,
  prequelLink,
  todoLink,
  shyLink,
  guyLink,
  fujoLink,
} = require('../../links.js');

const artCommandTypeCheck = require('./artCommandTypeCheck.js');
const { roleCheck, channelCheck } = require('./helperChecks.js');
const seedUsers = require('../Helpers/seeder.js');

const prefixCommandFunction = (msg, temp) => {
  let keyword = temp.slice(1);
  keyword = keyword.split(' ');
  keyword = keyword[0];

  //poll
  if (
    keyword === 'poll' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    pollAnnouncement(msg);
  }

  //chap
  else if (
    keyword === 'chapter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    chapterAnnouncement(msg);
  } else if (keyword === 'seed' && msg.author.id === '390450196711997440') {
    seedUsers(msg);
  }

  //bot message
  else if (
    keyword === 'message' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    botMessageCommand(msg);
  }

  //bot embed message
  else if (
    keyword === 'embedmessage' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    botEmbedMessageCommand(msg);
  }

  //purge
  else if (
    keyword === 'purge' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    purgeCommand(msg);
  }

  //mute
  else if (
    keyword === 'mute' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    muteCommand(msg);
  }

  //ban
  else if (
    keyword === 'ban' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    banCommand(msg);
  }

  //kick
  else if (
    keyword === 'kick' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    kickCommand(msg);
  }

  //strike
  else if (
    keyword === 'strike' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    strikeCommand(msg);
  }

  //art check
  else if (keyword.includes('art')) {
    artCommandTypeCheck(msg, keyword);
  }

  // //suggestion command
  if (keyword.startsWith('suggest')) {
    suggestionCommand(msg);
  }

  //role
  else if (keyword === 'role') {
    roleAssignCommand(msg);
  }

  //fujo
  else if (keyword === 'fujo') {
    msg.channel.send(fujoLink).catch(console.log);
  }

  //todo
  else if (
    keyword === 'todo' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(todoLink).catch(console.log);
  }

  //welcome
  else if (
    keyword === 'welcome' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message).catch(console.log);
  }

  //guy
  else if (
    keyword === 'guy' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(guyLink).catch(console.log);
  }

  //shy
  else if (
    keyword === 'shy' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(shyLink).catch(console.log);
  }

  //encyclopedia
  else if (keyword === 'encyclopedia') {
    msg.channel.send(encyclopediaLink).catch(console.log);
  }

  //chart
  else if (keyword === 'chart') {
    msg.channel.send(chartLink).catch(console.log);
  }

  //catalogue
  else if (keyword === 'catalogue') {
    msg.channel.send(catalogueLink).catch(console.log);
  }

  //prequel
  else if (
    keyword === 'prequel' &&
    (channelCheck(msg, 'welcome') ||
      channelCheck(msg, 'manga-discussion') ||
      channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(prequelLink).catch(console.log);
  }

  //wiki
  else if (keyword === 'wiki') {
    msg.channel.send(wikiLink).catch(console.log);
  }
};

module.exports = prefixCommandFunction;
