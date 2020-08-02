/*Checks which type of command was input*/

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
} = require('../links.js');

const artCommandTypeCheck = require('./artCommandTypeCheck.js');
const { roleCheck, channelCheck } = require('./helperChecks.js');
const seedUsers = require('../Helpers/seeder.js');
const emoteCommandTypeCheck = require('./emoteCommandTypeCheck.js');
const botMessageCommand = require('../Commands/Messaging/botMessageCommand.js');
const botEmbedMessageCommand = require('../Commands/Messaging/botEmbedMessageCommand.js');
const muteCommand = require('../Commands/Moderation/muteCommand.js');
const kickCommand = require('../Commands/Moderation/kickCommand.js');
const banCommand = require('../Commands/Moderation/banCommand.js');
const strikeCommand = require('../Commands/Moderation/strikeCommand.js');
const purgeCommand = require('../Commands/Moderation/purgeCommand.js');
const roleAssignCommand = require('../Commands/User/roleAssignCommand.js');
const suggestionCommand = require('../Commands/User/suggestionCommand.js');
const chapterAnnouncement = require('../Commands/Other/chapterAnnouncement.js');
const debateCommandTypeCheck = require('./debateCommandTypeCheck.js');

const prefixCommandFunction = (msg, temp) => {
  let keyword = temp.slice(1);
  keyword = keyword.split(' ');
  keyword = keyword[0];

  //chap command
  if (
    keyword === 'chapter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    chapterAnnouncement(msg);
  }

  //database seed command
  else if (keyword === 'seed' && msg.author.id === '390450196711997440') {
    seedUsers(msg);
  }

  //bot message command
  else if (
    keyword === 'message' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    botMessageCommand(msg);
  }

  //bot embed message command
  else if (
    keyword === 'embedmessage' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    botEmbedMessageCommand(msg);
  }

  //purge command
  else if (
    keyword === 'purge' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    purgeCommand(msg);
  }

  //mute command
  else if (
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

  //emote command check
  else if (keyword.includes('emote')) {
    emoteCommandTypeCheck(msg, keyword);
  }

  //art command check
  else if (keyword.includes('art')) {
    artCommandTypeCheck(msg, keyword);
  }

  //art command check
  else if (keyword.includes('debate')) {
    debateCommandTypeCheck(msg, keyword);
  }

  // //suggestion command
  else if (keyword.startsWith('suggest')) {
    suggestionCommand(msg);
  }

  //role command
  else if (keyword === 'role') {
    roleAssignCommand(msg);
  }

  //fujo command
  else if (keyword === 'fujo') {
    msg.channel.send(fujoLink).catch(console.error);
  }

  //todo command
  else if (
    keyword === 'todo' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(todoLink).catch(console.error);
  }

  //welcome command
  else if (
    keyword === 'welcome' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message).catch(console.error);
  }

  //guy command
  else if (
    keyword === 'guy' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(guyLink).catch(console.error);
  }

  //shy command
  else if (
    keyword === 'shy' &&
    (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(shyLink).catch(console.error);
  }

  //encyclopedia command
  else if (keyword === 'encyclopedia') {
    msg.channel.send(encyclopediaLink).catch(console.error);
  }

  //chart command
  else if (keyword === 'chart') {
    msg.channel.send(chartLink).catch(console.error);
  }

  //catalogue command
  else if (keyword === 'catalogue') {
    msg.channel.send(catalogueLink).catch(console.error);
  }

  //prequel command
  else if (
    keyword === 'prequel' &&
    (channelCheck(msg, 'welcome') ||
      channelCheck(msg, 'manga-discussion') ||
      channelCheck(msg, 'syed-bot-practice'))
  ) {
    msg.channel.send(prequelLink).catch(console.error);
  }

  //wiki command
  else if (keyword === 'wiki') {
    msg.channel.send(wikiLink).catch(console.error);
  }
};

module.exports = prefixCommandFunction;
