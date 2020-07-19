import { channelArray } from '../../utilities.js';

export const todoCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    msg.channel
      .send(
        'https://media.discordapp.net/attachments/447410298845003777/635705498624196608/K17.png'
      )
      .catch(console.log);
  }
};

export const welcomeCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `Welcome newbie, we have three questions for you:
  1. Are you up to date on the Jujutsu Kaisen manga?
  2. Have you read the prequel?
  3. Can Todo ask you a woke question?`;
    msg.channel.send(message).catch(console.log);
  }
};

export const dontCareCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `https://media.discordapp.net/attachments/447410298845003777/684664171174166538/20191130_235504.jpg?width=736&height=671`;
    msg.channel.send(message).catch(console.log);
  }
};

export const shyCommand = (msg) => {
  let welcomeChannel = channelArray.find((ch) => ch.name === 'welcome');
  let testChannel = channelArray.find((ch) => ch.name === 'syed-bot-practice');
  if (
    msg.channel.id === welcomeChannel.id ||
    msg.channel.id === testChannel.id
  ) {
    let message = `https://cdn.discordapp.com/attachments/704934870622797904/731173904269312101/Screenshot_20200507-234318_MangaZone.jpg`;
    msg.channel.send(message).catch(console.log);
  }
};
