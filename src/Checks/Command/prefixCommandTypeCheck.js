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
} = require('../../links.js');

const artCommandTypeCheck = require('./artCommandTypeCheck.js');
const debateCommandTypeCheck = require('./debateCommandTypeCheck.js');
const emoteCommandTypeCheck = require('./emoteCommandTypeCheck.js');
const { roleCheck, channelCheck } = require('../Other/helperChecks.js');
const seedUsers = require('../../Helpers/seeder.js');
const purgeCommand = require('../../Commands/Moderation/purgeCommand.js');
const suggestionCommand = require('../../Commands/Other/suggestionCommand.js');
const chapterAnnouncement = require('../../Commands/Other/chapterAnnouncement.js');
const messageCommandTypeCheck = require('./messageCommandTypeCheck.js');
const moderationCommandTypeCheck = require('./moderationCommandTypeCheck.js');
const roleCommandTypeCheck = require('./roleCommandTypeCheck.js');

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

  //bot message command check
  else if (keyword.includes('message')) {
    messageCommandTypeCheck(msg, keyword);
  }

  //purge command
  else if (
    keyword === 'purge' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    purgeCommand(msg);
  }

  //moderation command check
  else if (msg.mentions.members.array().length) {
    moderationCommandTypeCheck(msg, keyword);
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

  //suggestion command
  else if (keyword === 'suggest') {
    suggestionCommand(msg);
  }

  //role command check
  else if (keyword.includes('role')) {
    roleCommandTypeCheck(msg, keyword);
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
