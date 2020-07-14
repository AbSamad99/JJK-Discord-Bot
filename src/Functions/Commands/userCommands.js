import { channelArray, rolesArray } from '../../utilities.js';
import { assignRole, removeRole } from '../roleFunctions.js';
import { hasRoleCheck, lockedRolesCheck } from '../Checks/RoleChecks';

export const fujoCommand = (msg) => {
  msg.channel.send('https://bit.ly/2ZoTsQ4').catch(console.log);
};

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

export const encyclopediaCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1lPQvDk8o-jjJ_8qiIFkQmdB0GKAy4WeN_38_geoDsqw/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
};

export const catalogueCommand = (msg) => {
  let message = `https://docs.google.com/document/d/1LO6ZxqUlD3elokLhkjkoHqZGumdC3XQSHHysviKrBbA/edit?usp=sharing`;
  msg.channel.send(message);
};

export const chartCommand = (msg) => {
  let message = `https://docs.google.com/spreadsheets/d/1pyrdfwq-Qbj2eEJIsdD3nC9906n1KOYCNEpzn-8Wpx8/edit?usp=sharing`;
  msg.channel.send(message).catch(console.log);
};

export const roleAssignCommand = (msg) => {
  let botChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'bot-commands'
  );
  let testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (msg.channel.id !== botChannel.id && msg.channel.id !== testChannel.id)
    return;
  let temp = msg.content.slice(1);
  temp = temp.split(' ');
  let desiredRole = rolesArray.find(
    (role) => role.name.toLowerCase() == temp[1].toLowerCase()
  );
  if (!desiredRole) return;
  if (lockedRolesCheck(desiredRole)) return;
  if (!hasRoleCheck(msg, desiredRole)) {
    assignRole(msg, desiredRole);
  } else {
    removeRole(msg, desiredRole);
  }
};
