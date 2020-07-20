const fs = require('fs');

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
    const channelArray = JSON.parse(
      fs.readFileSync(`${process.cwd()}/src/Json-Files/channels.json`)
    );
    let welcomeChannel, mangaChannel, testChannel;
    welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
    mangaChannel = channelArray.find((ch) => ch.name === 'manga-discussion');
    testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
    if (
      msg.channel.id === welcomeChannel.id ||
      msg.channel.id === mangaChannel.id ||
      msg.channel.id === testChannel.id
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
