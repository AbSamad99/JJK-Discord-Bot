/*Checks which type of command was input*/

const artCommandTypeCheck = require('./artCommandTypeCheck.js');
const debateCommandTypeCheck = require('./debateCommandTypeCheck.js');
const emoteCommandTypeCheck = require('./emoteCommandTypeCheck.js');
const messageCommandTypeCheck = require('./messageCommandTypeCheck.js');
const moderationCommandTypeCheck = require('./moderationCommandTypeCheck.js');
const roleCommandTypeCheck = require('./roleCommandTypeCheck.js');
const {
  moderationArray,
  welcomeArray,
  miscArray,
} = require('../../checkArrays.js');
const welcomeCommandTypeCheck = require('./welcomeCommandTypeCheck.js');
const miscCommandTypeCheck = require('./miscCommandTypeCheck.js');

const prefixCommandFunction = (msg, temp, myCache) => {
  try {
    let keyword = temp.slice(1);
    keyword = keyword.split(' ');
    keyword = keyword[0];

    //bot message command check
    if (keyword.includes('message')) {
      messageCommandTypeCheck(msg, keyword);
    }

    //moderation command check
    if (moderationArray.some((c) => c === keyword)) {
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

    //role command check
    if (keyword.includes('role')) {
      roleCommandTypeCheck(msg, keyword);
    }

    //welcome command check
    if (welcomeArray.some((w) => w === keyword)) {
      welcomeCommandTypeCheck(msg, keyword);
    }

    //misc command check
    if (miscArray.some((m) => m === keyword)) {
      miscCommandTypeCheck(msg, keyword);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = prefixCommandFunction;
