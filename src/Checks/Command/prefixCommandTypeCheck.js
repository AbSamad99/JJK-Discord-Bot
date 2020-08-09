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
const seedUsers = require('../../Helpers/seeder.js');
const purgeCommand = require('../../Commands/Moderation/purgeCommand.js');
const suggestionCommand = require('../../Commands/Other/suggestionCommand.js');
const chapterAnnouncement = require('../../Commands/Other/chapterAnnouncement.js');
const messageCommandTypeCheck = require('./messageCommandTypeCheck.js');
const moderationCommandTypeCheck = require('./moderationCommandTypeCheck.js');
const roleCommandTypeCheck = require('./roleCommandTypeCheck.js');
const strikeCountCommand = require('../../Commands/Other/strikeCountCommand.js');
const helpCommand = require('../../Commands/Other/helpCommand.js');

const prefixCommandFunction = (msg, temp, myCache) => {
  try {
    let keyword = temp.slice(1);
    keyword = keyword.split(' ');
    keyword = keyword[0];

    //help command
    if (
      keyword === 'help' &&
      (msg.channel.id === '720958791432011789' /*Syed bot channel*/ ||
        msg.channel.id === '447513472427622410') /*bot commands channel*/
    ) {
      helpCommand(msg);
    }

    //chap command
    if (
      keyword === 'chapter' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      chapterAnnouncement(msg).catch(console.log);
    }

    //database seed command
    if (keyword === 'seed' && msg.author.id === '390450196711997440') {
      seedUsers(msg).catch(console.log);
    }

    //bot message command check
    if (keyword.includes('message')) {
      messageCommandTypeCheck(msg, keyword);
    }

    //purge command
    if (
      keyword === 'purge' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      purgeCommand(msg);
    }

    //moderation command check
    if (msg.mentions.members.array().length) {
      moderationCommandTypeCheck(msg, keyword, myCache);
    }

    //emote command check
    if (keyword.includes('emote')) {
      emoteCommandTypeCheck(msg, keyword);
    }

    //art command check
    if (keyword.includes('art')) {
      artCommandTypeCheck(msg, keyword);
    }

    //art command check
    if (keyword.includes('deb')) {
      debateCommandTypeCheck(msg, keyword);
    }

    //suggestion command
    if (keyword === 'suggest') {
      suggestionCommand(msg).catch(console.log);
    }

    //strike count command check
    if (keyword === 'strikecount') {
      strikeCountCommand(msg).catch(console.log);
    }

    //role command check
    if (keyword.includes('role')) {
      roleCommandTypeCheck(msg, keyword);
    }

    //fujo command
    if (keyword === 'fujo') {
      msg.channel.send(fujoLink).catch(console.error);
    }

    //todo command
    if (
      keyword === 'todo' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(todoLink).catch(console.error);
    }

    //welcome command
    if (
      keyword === 'welcome' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
      msg.channel.send(message).catch(console.error);
    }

    //guy command
    if (
      keyword === 'guy' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(guyLink).catch(console.error);
    }

    //shy command
    if (
      keyword === 'shy' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
        msg.channel.id === '720958791432011789') /*Syed bot channel*/
    ) {
      msg.channel.send(shyLink).catch(console.error);
    }

    //encyclopedia command
    if (keyword === 'encyclopedia') {
      msg.channel.send(encyclopediaLink).catch(console.error);
    }

    //chart command
    if (keyword === 'chart') {
      msg.channel.send(chartLink).catch(console.error);
    }

    //catalogue command
    if (keyword === 'catalogue') {
      msg.channel.send(catalogueLink).catch(console.error);
    }

    //prequel command
    if (
      keyword === 'prequel' &&
      (msg.channel.id === '704934870622797904' /*Welcome channel*/ ||
      msg.channel.id === '720958791432011789' /*Syed bot channel*/ ||
        msg.channel.id === '447514061769277450') /*Manga channel*/
    ) {
      msg.channel.send(prequelLink).catch(console.error);
    }

    //wiki command
    if (keyword === 'wiki') {
      msg.channel.send(wikiLink).catch(console.error);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = prefixCommandFunction;
