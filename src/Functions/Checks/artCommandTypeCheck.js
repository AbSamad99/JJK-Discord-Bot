const {
  getAllArtCommand,
  getArtCommand,
  getArtNamesCommand,
  addArtCommand,
  addArtCharacterCommand,
  removeArtCharacterCommand,
  removeArtCommand,
} = require('../Commands/artCommands.js');

const { roleCheck } = require('./helperChecks.js');

const artCommandTypeCheck = (msg, keyword) => {
  //get all art
  if (
    keyword === 'getallart' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getAllArtCommand(msg);
  }

  //add art
  else if (
    keyword === 'addart' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin') ||
      roleCheck(msg.member, 'Community Service Shaman'))
  ) {
    addArtCommand(msg);
  }

  //add character
  else if (
    keyword === 'addartcharacter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    addArtCharacterCommand(msg);
  }

  //removes character
  else if (
    keyword === 'removeartcharacter' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    removeArtCharacterCommand(msg);
  }

  //removes art
  else if (
    keyword === 'removeart' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    removeArtCommand(msg);
  }

  //get art
  else if (
    keyword === 'getart' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getArtCommand(msg);
  }

  //get art names
  else if (
    keyword === 'getartnames' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin'))
  ) {
    getArtNamesCommand(msg);
  }
};

module.exports = artCommandTypeCheck;
