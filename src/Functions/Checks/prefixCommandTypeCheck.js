import {
  roleAssignCommand,
  addArtCommand,
  getArtCommand,
  getAllArtCommand,
} from '../Commands/userCommands.js';

import { fujoCommand } from '../Commands/miscCommands.js';

import {
  welcomeCommand,
  todoCommand,
  shyCommand,
  dontCareCommand,
} from '../Commands/welcomeCommands.js';

import {
  catalogueCommand,
  chartCommand,
  prequelCommand,
  wikiCommand,
  encyclopediaCommand,
} from '../Commands/linkCommands.js';

import {
  chapterAnnouncement,
  pollAnnouncement,
  anonMessageCommand,
  muteCommand,
  kickCommand,
  banCommand,
  purgeCommand,
} from '../Commands/modCommands.js';

import { modPermsCheck } from './RoleChecks.js';

export const prefixCommandFunction = (msg) => {
  let temp = msg.content.toLowerCase();
  temp = temp.slice(1);

  //poll
  if (temp.startsWith('poll') && modPermsCheck(msg)) {
    pollAnnouncement(msg);
  }

  //chap
  else if (temp.startsWith('chapter') && modPermsCheck(msg)) {
    chapterAnnouncement(msg);
  }

  //anon
  else if (temp.startsWith('message') && modPermsCheck(msg)) {
    anonMessageCommand(msg);
  }

  //anon
  else if (temp.startsWith('purge') && modPermsCheck(msg)) {
    purgeCommand(msg);
  }

  //mute
  else if (temp.startsWith('mute') && modPermsCheck(msg)) {
    muteCommand(msg);
  }

  //ban
  else if (temp.startsWith('ban') && modPermsCheck(msg)) {
    banCommand(msg);
  }

  //kick
  else if (temp.startsWith('kick') && modPermsCheck(msg)) {
    kickCommand(msg);
  }

  //get all art
  else if (temp.startsWith('getallart') && modPermsCheck(msg)) {
    getAllArtCommand(msg);
  }

  //add art
  else if (temp.startsWith('addart') && modPermsCheck(msg)) {
    addArtCommand(msg);
  }

  //get art
  else if (temp.startsWith('getart') && modPermsCheck(msg)) {
    getArtCommand(msg);
  }

  //fujo
  else if (temp === 'fujo') {
    fujoCommand(msg);
  }

  //todo
  else if (temp === 'todo') {
    todoCommand(msg);
  }

  //welcome
  else if (temp === 'welcome') {
    welcomeCommand(msg);
  }

  //guy
  else if (temp === 'guy') {
    dontCareCommand(msg);
  }

  //shy
  else if (temp === 'shy') {
    shyCommand(msg);
  }

  //encyclopedia
  else if (temp === 'encyclopedia') {
    encyclopediaCommand(msg);
  }

  //chart
  else if (temp === 'chart') {
    chartCommand(msg);
  }

  //catalogue
  else if (temp === 'catalogue') {
    catalogueCommand(msg);
  }

  //prequel
  else if (temp.startsWith('prequel')) {
    prequelCommand(msg);
  }

  //wiki
  else if (temp.startsWith('wiki')) {
    wikiCommand(msg);
  }

  //role
  else if (temp.startsWith('role')) {
    roleAssignCommand(msg);
  }
};
