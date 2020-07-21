const {
  roleAssignCommand,
  suggestionCommand,
} = require('../Commands/userCommands.js');

const {
  getAllArtCommand,
  getArtCommand,
  getArtNamesCommand,
  addArtCommand,
  addArtCharacterCommand,
  removeArtCharacterCommand,
  removeArtCommand,
} = require('../Commands/artCommands.js');

const { fujoCommand } = require('../Commands/miscCommands.js');

const {
  welcomeCommand,
  todoCommand,
  shyCommand,
  dontCareCommand,
} = require('../Commands/welcomeCommands.js');

const {
  catalogueCommand,
  chartCommand,
  prequelCommand,
  wikiCommand,
  encyclopediaCommand,
} = require('../Commands/linkCommands.js');

const {
  chapterAnnouncement,
  pollAnnouncement,
  anonMessageCommand,
  muteCommand,
  kickCommand,
  banCommand,
  purgeCommand,
} = require('../Commands/modCommands.js');

const { roleCheck } = require('./helperChecks.js');

const prefixCommandFunction = (msg) => {
  let temp = msg.content.toLowerCase();
  temp = temp.slice(1);

  //poll
  if (
    temp.startsWith('poll') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    pollAnnouncement(msg);
  }

  //chap
  else if (
    temp.startsWith('chapter') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    chapterAnnouncement(msg);
  }

  //anon
  else if (
    temp.startsWith('message') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    anonMessageCommand(msg);
  }

  //anon
  else if (
    temp.startsWith('purge') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    purgeCommand(msg);
  }

  //mute
  else if (
    temp.startsWith('mute') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    muteCommand(msg);
  }

  //ban
  else if (
    temp.startsWith('ban') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    banCommand(msg);
  }

  //kick
  else if (
    temp.startsWith('kick') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    kickCommand(msg);
  }

  //get all art
  else if (
    temp.startsWith('getallart') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getAllArtCommand(msg);
  }

  //add art
  else if (
    temp.startsWith('addart') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin') ||
      roleCheck(msg.member, 'Community Service Shaman')) &&
    !temp.startsWith('addartcharacter')
  ) {
    addArtCommand(msg);
  }

  //add character
  else if (
    temp.startsWith('addartcharacter') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    addArtCharacterCommand(msg);
  }

  //removes character
  else if (
    temp.startsWith('removeartcharacter') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    removeArtCharacterCommand(msg);
  }

  //removes art
  else if (
    temp.startsWith('removeart') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin')) &&
    !temp.startsWith('removeartcharacter')
  ) {
    removeArtCommand(msg);
  }

  //get art
  else if (
    temp.startsWith('getart') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin')) &&
    !temp.startsWith('getartnames')
  ) {
    getArtCommand(msg);
  }

  //get art names
  else if (
    temp.startsWith('getartnames') &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getArtNamesCommand(msg);
  }

  // //suggestion command
  if (temp.startsWith('suggest')) {
    suggestionCommand(msg);
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

module.exports = prefixCommandFunction;
