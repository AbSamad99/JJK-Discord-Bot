/*Checks to see which type of art command was input by the user*/

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
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      getAllArtCommand(msg).catch(console.log);
    }

    //add art
    else if (
      keyword === 'addart' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
      msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
        msg.member.roles.cache.has('449481558559031296')) /*Community role*/
    ) {
      addArtCommand(msg).catch(console.log);
    }

    //add character
    else if (
      keyword === 'addartchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      addArtCharacterCommand(msg).catch(console.log);
    }

    //removes character
    else if (
      keyword === 'remartchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      removeArtCharacterCommand(msg).catch(console.log);
    }

    //edits character name
    else if (
      keyword === 'editartchar' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
        msg.member.roles.cache.has('447512449248395267')) /*admin role*/
    ) {
      editArtCharacterCommand(msg).catch(console.log);
    }

    //removes art
    else if (
      keyword === 'remart' &&
      (msg.member.roles.cache.has(
        '447512454810042369'
      ) /*Special Grade role*/ ||
      msg.member.roles.cache.has('447512449248395267') /*admin role*/ ||
        msg.member.roles.cache.has('449481558559031296')) /*Community role*/
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
