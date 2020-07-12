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

import { rolesArray } from './utilities.js';

export const prefixCommandFunction = (msg) => {
  let honoredOneRole = rolesArray.find(
    (role) => role.name === 'The Honored One'
  );
  let temp = msg.content.toLowerCase();
  temp = temp.slice(1);
  if (temp.startsWith('poll') && modPermsCheck(msg)) {
    pollAnnouncement(msg);
  } else if (temp.startsWith('chapter') && modPermsCheck(msg)) {
    chapterAnnouncement(msg);
  } else if (temp.startsWith('message') && modPermsCheck(msg)) {
    anonMessageCommand(msg);
  } else if (
    temp.startsWith('mute') &&
    (modPermsCheck(msg) || msg.member.roles.cache.has(honoredOneRole.id))
  ) {
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
