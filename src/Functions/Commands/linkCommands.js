const fs = require('fs');

const { channelCheck } = require('../Checks/helperChecks.js');

const encyclopediaCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1lPQvDk8o-jjJ_8qiIFkQmdB0GKAy4WeN_38_geoDsqw/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
};

const catalogueCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1LO6ZxqUlD3elokLhkjkoHqZGumdC3XQSHHysviKrBbA/edit?usp=sharing`;
  msg.channel.send(message);
};

const chartCommand = (msg) => {
  let message = `https://docs.google.com/spreadsheets/d/1pyrdfwq-Qbj2eEJIsdD3nC9906n1KOYCNEpzn-8Wpx8/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
};

const prequelCommand = (msg) => {
  try {
    if (
      channelCheck(msg, 'welcome') ||
      channelCheck(msg, 'manga-discussion') ||
      channelCheck(msg, 'syed-bot-practice')
    ) {
      msg.channel.send(
        'https://mangadex.org/title/30288/tokyo-metropolitan-magic-technical-school'
      );
    }
  } catch (err) {
    console.log(err);
  }
};

const wikiCommand = (msg) => {
  msg.channel
    .send('https://jujutsu-kaisen.fandom.com/wiki/Jujutsu_Kaisen_Wiki')
    .catch(console.log);
};

module.exports = {
  encyclopediaCommand: encyclopediaCommand,
  catalogueCommand: catalogueCommand,
  chartCommand: chartCommand,
  prequelCommand: prequelCommand,
  wikiCommand: wikiCommand,
};
