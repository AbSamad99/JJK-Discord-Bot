/*Checks to see which type of art command was input by the user*/

const { roleCheck } = require('../Other/helperChecks.js');
const addArtCommand = require('../../Commands/Art/addArtCommand.js');
const removeArtCommand = require('../../Commands/Art/removeArtCommand.js');
const getArtCommand = require('../../Commands/Art/getArtCommand.js');
const getAllArtCommand = require('../../Commands/Art/getAllArtCommand.js');
const removeArtCharacterCommand = require('../../Commands/Art/removeArtCharacterCommand.js');
const addArtCharacterCommand = require('../../Commands/Art/addArtCharacterCommand.js');
const getArtNamesCommand = require('../../Commands/Art/getArtNamesCommand.js');
const editArtCharacterCommand = require('../../Commands/Art/editArtCharacterCommand.js');

const artCommandTypeCheck = (msg, keyword) => {
  try {
    //get all art
    if (
      keyword === 'getallart' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      getAllArtCommand(msg).catch(console.log);
    }

    //add art
    else if (
      keyword === 'addart' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin') ||
        roleCheck(msg.member, 'Community Service Shaman'))
    ) {
      addArtCommand(msg).catch(console.log);
    }

    //add character
    else if (
      keyword === 'addartchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      addArtCharacterCommand(msg).catch(console.log);
    }

    //removes character
    else if (
      keyword === 'remartchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      removeArtCharacterCommand(msg).catch(console.log);
    }

    //edits character name
    else if (
      keyword === 'editartchar' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin'))
    ) {
      editArtCharacterCommand(msg).catch(console.log);
    }

    //removes art
    else if (
      keyword === 'remart' &&
      (roleCheck(msg.member, 'Special-Grade Shaman') ||
        roleCheck(msg.member, 'admin') ||
        roleCheck(msg.member, 'Community Service Shaman'))
    ) {
      removeArtCommand(msg).catch(console.log);
    }

    //get art
    else if (keyword === 'getart') {
      getArtCommand(msg).catch(console.log);
    }

    //get art names
    else if (keyword === 'getartnames') {
      getArtNamesCommand(msg).catch(console.log);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = artCommandTypeCheck;
