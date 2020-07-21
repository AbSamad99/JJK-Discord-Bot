const fs = require('fs');

const { channelCheck } = require('../Checks/helperChecks');

const todoCommand = (msg) => {
  if (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice')) {
    msg.channel
      .send(
        'https://media.discordapp.net/attachments/447410298845003777/635705498624196608/K17.png'
      )
      .catch(console.log);
  }
};

const welcomeCommand = (msg) => {
  if (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice')) {
    let message = `Welcome newbie, we have three questions for you:
1. Are you up to date on the Jujutsu Kaisen manga?
2. Have you read the prequel?
3. Can Todo ask you a woke question?`;
    msg.channel.send(message).catch(console.log);
  }
};

const dontCareCommand = (msg) => {
  if (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice')) {
    let message = `https://media.discordapp.net/attachments/447410298845003777/684664171174166538/20191130_235504.jpg?width=736&height=671`;
    msg.channel.send(message).catch(console.log);
  }
};

const shyCommand = (msg) => {
  if (channelCheck(msg, 'welcome') || channelCheck(msg, 'syed-bot-practice')) {
    let message = `https://cdn.discordapp.com/attachments/704934870622797904/731173904269312101/Screenshot_20200507-234318_MangaZone.jpg`;
    msg.channel.send(message).catch(console.log);
  }
};

module.exports = {
  todoCommand: todoCommand,
  welcomeCommand: welcomeCommand,
  dontCareCommand: dontCareCommand,
  shyCommand: shyCommand,
};
