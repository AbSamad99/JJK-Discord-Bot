/*Checks to see which type of art command was input by the user*/

const { roleCheck } = require('../Other/helperChecks.js');
const addArtCommand = require('../../Commands/Art/addArtCommand.js');
const removeArtCommand = require('../../Commands/Art/removeArtCommand.js');
const getArtCommand = require('../../Commands/Art/getArtCommand.js');
const getAllArtCommand = require('../../Commands/Art/getAllArtCommand.js');
const removeArtCharacterCommand = require('../../Commands/Art/removeArtCharacterCommand.js');
const addArtCharacterCommand = require('../../Commands/Art/addArtCharacterCommand.js');
const getArtNamesCommand = require('../../Commands/Art/getArtNamesCommand.js');

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
      roleCheck(msg.member, 'admin') ||
      roleCheck(msg.member, 'Community Service Shaman'))
  ) {
    removeArtCommand(msg);
  }

  //get art
  else if (keyword === 'getart') {
    getArtCommand(msg);
  }

  //get art names
  else if (
    keyword === 'getartnames' &&
    (roleCheck(msg.member, 'Special-Grade Shaman') ||
      roleCheck(msg.member, 'admin') ||
      roleCheck(msg.member, 'Community Service Shaman'))
  ) {
    getArtNamesCommand(msg);
  }
};

module.exports = artCommandTypeCheck;
