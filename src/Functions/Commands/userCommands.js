const urlExist = require('url-exist');

import { rolesArray, characterArtObj } from '../../utilities.js';
import { assignRole, removeRole } from '../Roles/roleFunctions.js';
import { hasRoleCheck, lockedRolesCheck } from '../Checks/RoleChecks';

//assigns character role to a member
export const roleAssignCommand = (msg) => {
  let botChannel, testChannel, temp, desiredRole;
  botChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'bot-commands'
  );
  testChannel = msg.guild.channels.cache.find(
    (ch) => ch.name === 'syed-bot-practice'
  );
  if (msg.channel.id !== botChannel.id && msg.channel.id !== testChannel.id)
    return;
  temp = msg.content.slice(1);
  temp = temp.split(' ');
  if (!temp[1]) {
    msg.channel.send('Please specify a character name');
    return;
  }
  desiredRole = rolesArray.find(
    (role) => role.name.toLowerCase() == temp[1].toLowerCase()
  );
  if (!desiredRole) {
    msg.channel.send('Please specify a valid character name');
    return;
  }
  if (lockedRolesCheck(desiredRole)) {
    msg.channel.send('Cannot Assign that role');
    return;
  }
  if (!hasRoleCheck(msg, desiredRole)) {
    assignRole(msg, desiredRole);
  } else {
    removeRole(msg, desiredRole);
  }
};

//adds an art
export const addArtCommand = async (msg) => {
  try {
    let artChannel, testChannel, temp, characterArray, index;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!temp[2]) {
      msg.channel.send('Please provide link');
      return;
    }
    for (index = 2; index < temp.length; index++) {
      if (!(await urlExist(temp[2]))) {
        msg.channel.send(`Link ${index - 1} is invalid`);
        return;
      }
      characterArray.push(temp[2]);
    }
    msg.channel
      .send('Added')
      .then(() => msg.suppressEmbeds())
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets an art
export const getArtCommand = (msg) => {
  try {
    let artChannel, testChannel, temp, characterArray, randomIndex;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }
    randomIndex = Math.floor(Math.random() * characterArray.length);
    msg.channel.send(characterArray[randomIndex]).catch(console.log);
  } catch (err) {
    console.log(err);
  }
};

//gets all art for a character
export const getAllArtCommand = (msg) => {
  try {
    let artChannel, testChannel, temp, characterArray, index, message;

    artChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'music-and-art'
    );
    testChannel = msg.guild.channels.cache.find(
      (ch) => ch.name === 'syed-bot-practice'
    );

    if (msg.channel.id !== artChannel.id && msg.channel.id !== testChannel.id)
      return;

    temp = msg.content.slice(1);
    temp = temp.split(' ');
    if (!temp[1]) {
      msg.channel.send('Please specify a character name');
      return;
    }
    characterArray = characterArtObj[temp[1].toLowerCase()];
    if (!characterArray) {
      msg.channel.send('Invalid character');
      return;
    }
    if (!characterArray.length) {
      msg.channel.send('No art added for this character');
      return;
    }

    message = `-addart ${temp[1]}`;

    for (index = 0; index < characterArray.length; index++) {
      message = `${message} ${characterArray[index]}`;
    }

    msg.channel
      .send(message)
      .then((botMsg) => botMsg.suppressEmbeds())
      .catch(console.log);
  } catch (err) {
    console.log(err);
  }
};
