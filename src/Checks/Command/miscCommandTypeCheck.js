/*Checks to see which type of welcome command was input by the user*/

const {
  encyclopediaLink,
  wikiLink,
  chartLink,
  catalogueLink,
  prequelLink,
  fujoLink,
} = require('../../links.js');

const strikeCountCommand = require('../../Commands/Other/strikeCountCommand.js');
const helpCommand = require('../../Commands/Other/helpCommand.js');
const seedUsers = require('../../Helpers/seeder.js');
const suggestionCommand = require('../../Commands/Other/suggestionCommand.js');
const chapterAnnouncement = require('../../Commands/Other/chapterAnnouncement.js');

const miscCommandTypeCheck = (msg, keyword) => {
  try {
    //help command
    if (
      keyword === 'help' &&
      (msg.channel.id === '742257053954736260' /*Bot Art channel*/ ||
      msg.channel.id === '720958791432011789' /*Syed bot channel*/ ||
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

    //wiki command
    if (keyword === 'wiki') {
      msg.channel.send(wikiLink).catch(console.error);
    }

    //fujo command
    if (keyword === 'fujo') {
      msg.channel.send(fujoLink).catch(console.error);
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

    //suggestion command
    if (keyword === 'suggest') {
      suggestionCommand(msg).catch(console.log);
    }

    //strike count command check
    if (keyword === 'strikecount') {
      strikeCountCommand(msg).catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = miscCommandTypeCheck;
