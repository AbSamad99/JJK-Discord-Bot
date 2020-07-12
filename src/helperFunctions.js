const Discord = require('discord.js');
const ms = require('ms');
import {
  chapterAnnouncement,
  pollAnnouncement,
  fujoCommand,
  todoCommand,
  welcomeCommand,
  anonMessageCommand,
  dontCareCommand,
  shyCommand,
  catalogueCommand,
  chartCommand,
  encyclopediaCommand,
  roleAssignCommand,
  muteCommand,
} from './Functions/commandFunctions';

import { modPermsCheck } from './Functions/checkFunctions.js';

export const prefixCommandFunction = (msg) => {
  let temp = msg.content.toLowerCase();
  temp = temp.slice(1);
  if (temp.startsWith('poll') && modPermsCheck(msg)) {
    pollAnnouncement(msg);
  } else if (temp.startsWith('chapter') && modPermsCheck(msg)) {
    chapterAnnouncement(msg);
  } else if (temp.startsWith('message') && modPermsCheck(msg)) {
    anonMessageCommand(msg);
  } else if (temp.startsWith('mute') && modPermsCheck(msg)) {
    muteCommand(msg);
  } else if (temp === 'fujo') {
    fujoCommand(msg);
  } else if (temp === 'todo') {
    todoCommand(msg);
  } else if (temp === 'welcome') {
    welcomeCommand(msg);
  } else if (temp === 'guy') {
    dontCareCommand(msg);
  } else if (temp === 'shy') {
    shyCommand(msg);
  } else if (temp === 'encyclopedia') {
    encyclopediaCommand(msg);
  } else if (temp === 'chart') {
    chartCommand(msg);
  } else if (temp === 'catalogue') {
    catalogueCommand(msg);
  } else if (temp.startsWith('role')) {
    roleAssignCommand(msg);
  }
};

export const assignRole = (msg, role) => {
  msg.member.roles
    .add(role)
    .then(() => {
      let embedResponse = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Role Added')
        .setColor(3447003)
        .addField('Info:', `Added <@&${role.id}> to <@${msg.author.id}>`);
      msg.channel.send(embedResponse);
    })
    .catch(console.log);
};

export const removeRole = (msg, role) => {
  msg.member.roles
    .remove(role)
    .then(() => {
      let embedResponse = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('Role Removed')
        .setColor(3447003)
        .addField('Info:', `Removed <@&${role.id}> from <@${msg.author.id}>`);
      msg.channel.send(embedResponse);
    })
    .catch(console.log);
};

export const assignMuteRole = (msg, toMute, muteRole, time) => {
  toMute.roles
    .add(muteRole)
    .then(() => {
      let embedResponse = new Discord.MessageEmbed()
        .setAuthor(msg.author.tag, msg.author.avatarURL())
        .setTitle('User Muted')
        .setColor(3447003)
        .addField('Info:', `<@${toMute.id}> has been muted for ${time}`);
      msg.channel.send(embedResponse);
    })
    .catch(console.log);
  setTimeout(() => {
    toMute.roles.remove(muteRole).catch(console.log);
  }, ms(time));
};
